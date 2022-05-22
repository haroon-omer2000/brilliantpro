import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './components/Header';

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
    <div>
     <Header APP_NAME = {APP_NAME} />
    </div>
  );
}

export default App;
