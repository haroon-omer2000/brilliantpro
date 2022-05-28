import './App.css';
import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddCourse from './components/AddCourse';
import DisplayCourse from './components/DisplayCourse';
import UpdateCourse from './components/UpdateCourse';
import Quizzes from './components/Quizzes';
import DisplayQuiz from './components/DisplayQuiz';

function App() {

  const APP_NAME = 'BrilliantPro';

  const [user, setUser] = useState({
    email: '',
    role: ''
  });

  useEffect(() =>{
    
  },[])

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
            <Route path="/Courses/:id" exact element = {<DisplayCourse />} />   
            <Route path="/Courses/:id/Update" exact element = {<UpdateCourse />} />      
            <Route path="/Courses/:id/Quizzes" exact element = {<Quizzes />} /> 
            <Route path="/Courses/:id/Quizzes/:course_id" exact element = {<DisplayQuiz />} />           
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
