import React,{useContext, useState} from 'react'
import styled from 'styled-components'
import {  signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../lib/fireBaseConfig'
import {useNavigate} from 'react-router-dom'
import { userContext } from '../context/context';

export default function Login() {
      
   const [email,setEmail] = useState();
   const [password,setPassword] = useState();
   const Navigate = useNavigate();

   const userValue = useContext(userContext);
    
 const handleLogin = async(e)=>{
 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      userValue.setUser({
        "userName":user.displayName,
        "userEmail":user.email,
        "userAccessToken":user.accessToken,
      })
      localStorage.setItem("accessToken",user.accessToken);
      const res = await fetch(`${process.env.REACT_APP_URL}/loginUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Specify the content type as JSON
        },
        body: JSON.stringify({
            email: user.email,
            token: user.accessToken
        })
         });
    const responseData = await res.json();
         if (res.ok) {
        // console.log('Success:', responseData);  
       } else {
        // console.error('Error:', responseData);  
            }
     } catch (error) {
      console.log("error",error);
     }
  
     Navigate('/')
 }
 

  return (
    <Contain>
            <Main>
            <Heading>
              <h1>Login here</h1>
            </Heading>
            <FormSection>
              <InputFeild>
                <h4>Enter your Email</h4>
               <input type="email" placeholder='Email'  onChange={e=>{setEmail(e.target.value)}}/>

               <h4>Enter your password</h4>
               <input type="password" placeholder='Password' onChange={e=>{setPassword(e.target.value)}} />
              </InputFeild>
              <button onClick={handleLogin}>Submit</button>
               <NewUser><p>New User?</p> <h4 onClick={e=>{Navigate('/signup')}}>Sign Up</h4></NewUser>
            </FormSection>
            </Main>
    </Contain>
  )
}

const Contain = styled.div`
min-height: 100vh;
min-width: 100vw;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: lightblue;
`;
const Main = styled.div`
 min-height: 60vh;
 display: flex;
 justify-content: center;
 flex-direction: column;
 background-color: white;
 padding: 0.2rem 1rem;
 border-radius: 12px;
 box-shadow: 1px 1px 2px 4px gray;
`;
const Heading = styled.div`
h1{
  font-size: 44px;
}
`;
const FormSection = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
 gap: 3rem ;

 button{
   cursor: pointer;
  border: none;
  font-size: 18px;
  padding: 0.4rem 1rem;
  background-color: black;
  color: white;
  width: 70%;
  border-radius: 8px;
  font-weight: 600;
 }
`;
const InputFeild = styled.div`
text-align: justify;
h4{
  font-weight: 500;
}
 input{
  border: none;
   background-color: aliceblue;
   height: 4vh;
   min-width: 20rem;
   border: 10px;
   font-size: 16px;
   font-weight: 600;
   padding-left: 5px;
 }
`;

const NewUser = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 6px;

h4{
  cursor: pointer;  
}
`;


