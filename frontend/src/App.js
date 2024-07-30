import React, {useEffect, useState } from 'react'
import './App.css'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import { userContext } from './context/context'
export default function App() {

  const [user,setUser] = useState('');
  
   const handleUser = async(token)=>{
    const res = await fetch(`${process.env.REACT_APP_URL}/getUser`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'  // Specify the content type as JSON
      },
      body: JSON.stringify({
          token
      })
  });
  const responseData = await res.json();
  if (res.ok) {
      // console.log('Success:', responseData);  
      setUser({
        "name":responseData.name,
        "number":responseData.number,
        "email":responseData.email,
        "token":responseData.token
      })
  } else {
       localStorage.clear();
      console.error('Error:', responseData); 
  }
   }

  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    if(token)
    {
       handleUser(token);

    }
  },[user])
  return (
    <userContext.Provider value={{user,setUser}}>
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        {localStorage.getItem('accessToken')?<Route path='/' element={<Home/>}/>:<></>}
        <Route path = '*' element={<Login/>}/>
      </Routes>
    </Router>
    </userContext.Provider>
  )
}
