import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { userContext } from '../context/context';
import heroPlane from '../utils/heroPlane.jpg'
import search from '../utils/seach.png'
import StatusComponent from '../components/StatusComponent'

const socket = io(process.env.REACT_APP_URL);
const Home = () => {
  const [flights, setFlights] = useState([]);
  const [changes,setChanges] = useState([]);
   const userValue = useContext(userContext)

   const convertToIST = (isoString) => {
    const date = new Date(isoString);
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };

    // Convert to IST and format
    return date.toLocaleString('en-IN', options);
  };

  useEffect(() => {
    // Handle initial data from the server
    socket.on('initialData', (data) => {
      setFlights(data);
    });

    // Handle updated data from the server
    socket.on('flightUpdate', (data) => {
      setChanges(data)
    });
      
    // Clean up on component unmount
    return () => {
      socket.off('initialData');
      socket.off('updateData');
    };
  }, []);




  return (
    <Contain>
      <Navbar/>
      {/* {flights&&flights.map((flight, index) => (
          <li key={index}>{`${flight.flight_id} - ${flight.status}`}</li>
        ))}
       {changes.fullDocument?<> {changes.fullDocument.flight_id} {changes.fullDocument.status}</>:<></>} */}
           <Main>
             <HeadSection>
              <h1>Stay Updated with your Flights!!</h1>
             </HeadSection>
             <Bottom>
              <h3>Find all the details of flight......</h3>
               <InputValueSection>
                <InputBox placeholder='Airport, Flight....'/>
                 <img src={search} alt="icon" />
               </InputValueSection>

                 <InfoSystem>
                    <Top>
                      <UpdateStatus>
                        <p>Updates</p>   
                         {
                          changes.fullDocument?<Details>
                            <p>{changes.fullDocument.flight_id}</p>
                         <h5>{changes.fullDocument.airport}</h5>
                          <p>{changes.fullDocument.status}</p>
                       <p>{changes.fullDocument.from}&nbsp;→&nbsp;{changes.fullDocument.to}</p>
                        <p>{convertToIST(changes.fullDocument.schedule_departure)} </p>
                          </Details>:<>No Changes in current schedule</>
                         }                    
                      </UpdateStatus>
                      <BoardingStatus>
                        <p>Important!!</p>
                         <StatusComponent/>
                      </BoardingStatus>
                    </Top>
                   
                   <AllFlight>
                   {flights&&flights.map((flight, index) => (
                    <Details key={index}>
                      {/* {`${flight.flight_id} - ${flight.status}`} */}
                      <p>{flight.flight_id}</p>
                      <h5>{flight.airport}</h5>
                      <p>{flight.from}&nbsp;→&nbsp;{flight.to}</p>
                      <p>{convertToIST(flight.schedule_departure)} </p>
                    </Details>
                    ))}

                   </AllFlight>
                
                </InfoSystem>    

                
             </Bottom>
              

           </Main>
         

    </Contain>
  );
};

const Contain = styled.div`
 display: flex;
 flex-direction: column;
background-color: #2888db;
`;
const Main = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 gap: 1rem;
 min-height: 100vh;
`;

const HeadSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
   background-image: url(${heroPlane});
   background-repeat: no-repeat;
   background-size: cover;
   min-width: 99vw;
   min-height: 95vh;
   h1{
     text-align: center;
    color: white;
    font-size: 56px;
    font-weight: 700;
   }
`;

const Bottom = styled.div`
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
 h3{
  text-align: center;
  color: white;
  font-size: 22px;
 }
`;

const InputValueSection = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;

img{
   height: 28px;
  position: absolute;
  top: 4.5rem;
  right: 1rem;
  cursor: pointer;
  &:hover{
    background-color: lightgray;
    border-radius: 50%;
  }
}
`;
const InputBox = styled.input`
 margin-top: 4rem;
 min-height: 5vh;
 min-width: 45vw;
 border-radius: 8px;
 background-color: aliceblue;
 border: none;
 font-size: 16px;
 font-weight: 400;
 padding: 0.4rem 1rem;
`;

const InfoSystem = styled.div`
margin-top: 5rem;
 margin-bottom: 2rem;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 gap: 2rem;
`;
const Top = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
gap: 1rem;

@media (max-width:768px)
{
  flex-direction: column;
}
`;
const UpdateStatus = styled.div`
background-color: #d7d7d7;
 min-height: 35vh;
 min-width: 40vw;
 border-radius: 12px;
 box-shadow: 2px 2px 2px 4px black;
 @media (max-width:768px)
{
  min-width: 60vw;
}
display: flex;
align-items: center;
flex-direction: column;
p{
  font-weight: 600;
}
`;
const BoardingStatus = styled.div`
background-color: aliceblue;
 min-height: 35vh;
 min-width: 46vw;
 border-radius: 12px;
 box-shadow: 2px 2px 2px 4px black;
 @media (max-width:768px)
{
  min-width: 60vw;
}
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
p{
  font-weight: 600;
}
`;

const AllFlight = styled.div`
 background-color: #d7d7d7;
 min-height: 35vh;
 min-width: 60vw;
 border-radius: 12px;
 box-shadow: 2px 2px 2px 4px black;
 display: flex;
 justify-content: center;
 flex-direction: column;
 padding: 0.4rem 1rem;
 gap: 2px;
 p{
  text-align: center;
  min-width: 6vw;
 }
`;

const Details = styled.div`
cursor: pointer;
background-color: aliceblue;
padding-left: 0.4rem;
min-height: 4vh;
border-radius: 4px;
display: flex;
gap: 2rem;
align-items: center;
`;

export default Home;
