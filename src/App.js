import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddCourse from './components/AddCourse';

function App() {

  const APP_NAME = 'BrilliantPro';

  const [user, setUser] = useState({
    email: '',
    role: ''
  });

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
      <Router>
        <Header APP_NAME={APP_NAME} user = {user} setUser = {setUser} />
        <div className='app-container'>
        <Routes>
            <Route path="/" exact element = {<Home user = {user} setUser = {setUser} />} />
            <Route path="/Login" exact element = {<Login setUser = {setUser} />} />
            <Route path="/Register" exact element = {<Register />} />
            <Route path="/AddCourse" exact element = {<AddCourse />} />            
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
