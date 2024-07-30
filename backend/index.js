const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('./db/User');
const Flight = require('./db/Flight');
const Airport = require('./db/Airport');
require('dotenv').config()



const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
require('./db/config');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider's service
  auth: {
    user: 'your_email@example.com', // Your email
    pass: 'your_password', // Your email password or app password
  },
});
// Endpoint to send email
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'your_email@example.com',
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: 'Error sending email', error });
    }
    res.status(200).send({ message: 'Email sent', info });
  });
});


// API for adding flight
app.post('/addingFlight', async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).send(flight);
  } catch (error) {
    console.error('Error adding flight:', error);
    res.status(500).send(error);
  }
});

app.post('/changeFlightInfo', async (req, res) => {
  try {
    const flight_id = req.body.flight_id;
    if (!flight_id) {
      return res.status(400).send("Flight ID is required");
    }

    const updatedFlight = await Flight.findOneAndUpdate(
      { flight_id: flight_id },
      req.body,
      { new: true }
    );

    if (updatedFlight) {
      res.status(200).send("Flight info updated successfully");
    } else {
      res.status(404).send("Flight not found");
    }
  } catch (error) {
    console.error('Error updating flight info:', error);
    res.status(500).send("Internal server error");
  }
});

app.get("/getAllFlights", async (req, res) => {
    try {
      const flights = await Flight.find();
      if (flights.length > 0) {
        res.status(200).send(flights);
      } else {
        res.status(404).send("No flights found");
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/getFlightByAirport", async (req, res) => {
    try {
      const airportName = req.body.airport;
      if (!airportName) {
        return res.status(400).send("Airport name is required");
      }
      const flights = await Flight.find({ airport: airportName });
      if (flights.length > 0) {
        res.status(200).send(flights);
      } else {
        res.status(404).send("No flights found for the given airport");
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).send("Internal server error");
    }
  });

  app.post("/getFlightByStatus", async (req, res) => {
    
    try {
      const flightStatus = req.body.status;
      if (!flightStatus) {
        return res.status(400).send("Flight Status is required");
      }
      const flights = await Flight.find({ status: flightStatus });
      if (flights.length > 0) {
        res.status(200).send(flights);
      } else {
        res.status(404).send(`No flights found ${flightStatus}`);
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      res.status(500).send("Internal server error");
    }
  });
  

 // Watch the flights collection for changes
const flightStream = Flight.watch([], { fullDocument: 'updateLookup' });

io.on('connection', (socket) => {
  console.log('New client connected');

  // Send initial data
  const sendInitialData = async () => {
    try {
      const data = await Flight.find().exec(); // Use .exec() to get a promise
      socket.emit('initialData', data);
    } catch (err) {
      console.error(err);
    }
  };

  sendInitialData();

  // Listen for changes in the MongoDB collection
     flightStream.on('change', (change) => {
    // Emit the change to the connected client
    socket.emit('flightUpdate', change);
  });


    socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});





// API for handling users
app.post('/newUser', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send(error);
  }
});

app.post('/loginUser', async (req, res) => {
  try {
    const { email, accessToken } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { accessToken: accessToken },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.post('/getUser', async (req, res) => {
  try {
    const user = await User.findOne({ accessToken: req.body.accessToken });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('No user found');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.status(200).send('This is here');
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
