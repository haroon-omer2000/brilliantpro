import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const APP_NAME = 'BrilliantPro';

  useEffect(() =>{
    
  },[])

  const test = async () => {
    fetch('http://localhost:4000/test',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }).then((response) => response.json()).then( data => {
         console.log(data); 
      })
  }

  return (
    <Router>
      <Header APP_NAME={APP_NAME} />
      <Routes>
        <Route path="/Login" exact element = {<Login />} />
        <Route path="/Register" exact element = {<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
