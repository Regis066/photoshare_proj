import React from 'react';
import { useEffect } from 'react';
import { gapi } from 'gapi-script'
import {Routes, Route , useNavigate} from 'react-router-dom';
import Login from './components/Login';
import Home from './container/Home';

const App = () => {

  useEffect(()=>{
    function start (){
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN , 
        scope: ''
      })
    };

    gapi.load('client:auth' , start);
  });
  return (
    <Routes>
    <Route path='Login' element={<Login />} />
    <Route path='/*' element={<Home />} />
    </Routes>  
  )
}

export default App
