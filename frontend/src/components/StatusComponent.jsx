import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function StatusComponent() {
 
  const [boarding,setBoarding] = useState();
  const [delayed,setDelayed] = useState();

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

  const handleFlight = async (status) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_URL}/getFlightByStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Ensure the server knows we're sending JSON
            },
            body: JSON.stringify({ status })
        });

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        if(data[0].status==='Boarding') {
          setBoarding(data);
        }else{
          setDelayed(data);
        }

    } catch (error) {
        console.error('Error fetching flight data:', error);
    }
};
 
   useEffect(()=>{

    if(!boarding) handleFlight("Boarding");
    if(!delayed) handleFlight("Delayed");


   },[])
 
  return (
    <Main>
      
      {boarding&&boarding.map((flight, index) => (
                    <Details key={index}>
                      {/* {`${flight.flight_id} - ${flight.status}`} */}
                      <p>{flight.flight_id}</p>
                      <p>{flight.status}</p>
                      <h5>{flight.airport}</h5>
                      <p>{flight.from}&nbsp;→&nbsp;{flight.to}</p>
                      <p>{convertToIST(flight.schedule_departure)} </p>
                    </Details>
                    ))}

{delayed&&delayed.map((flight, index) => (
                    <Details key={index}>
                      {/* {`${flight.flight_id} - ${flight.status}`} */}
                      <p>{flight.flight_id}</p>
                      <p>{flight.status}</p>
                      <h5>{flight.airport}</h5>
                      <p>{flight.from}&nbsp;→&nbsp;{flight.to}</p>
                      <p>{convertToIST(flight.schedule_departure)} </p>
                    </Details>
                    ))}


    </Main>
  )
}

const Main = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
 gap: 3px;
`;

const Details = styled.div`
cursor: pointer;
background-color: aliceblue;
padding-left: 0.4rem;
padding-right: 0.4rem;
min-height: 4vh;
border-radius: 4px;
display: flex;
gap: 2rem;
align-items: center;
min-width:44vw;
`;
