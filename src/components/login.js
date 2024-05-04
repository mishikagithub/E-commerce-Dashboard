/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate("/");
    }
  }, []);

  const handlelogin = async () => {
    console.warn(email,password);
    let result = await fetch("http://localhost:5000/login", {
      method:'post',
        body:JSON.stringify({email,password}),
        headers:{
            'content-Type': 'application/json'
        }
    });
    result = await result.json();
    console.warn(result);
    //keep user data in localstorage
    
    if(result.auth){
      localStorage.setItem('user',JSON.stringify(result.user))
      localStorage.setItem('token',JSON.stringify(result.auth))
        navigate('/')
    }else{
      alert("please enter a valid details")
    }
   }
  return (
    <div className='login'>
      <h1>login page</h1>
      <input
        type='text'
        className='inputbox'
        placeholder='Enter your email'
        onChange={(e) => setemail(e.target.value)}
        value={email}
      />
      <input
        type='password'
        className='inputbox'
        placeholder='Enter your password'
        onChange={(e) => setpassword(e.target.value)}
        value={password}
      />
      <button onClick={handlelogin} className='appbutton' type='submit'>
        Login
      </button>
    </div>
  );
};
export default login;