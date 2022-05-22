import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

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
      <h1>Hello world</h1>
      <button onClick={test}>Fetch</button>
    </div>
  );
}

export default App;
