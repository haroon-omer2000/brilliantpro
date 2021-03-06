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
import AddQuiz from './components/AddQuiz';
import Assessments from './components/Assessments';
import AddAssessment from './components/AddAssessment';
import Materials from './components/Materials';
import AddMaterial from './components/AddMaterial';
import Card from './components/Card';
import EnrolledUsers from './components/EnrolledUsers';
import CoursesInfo from './components/CoursesInfo';

function App() {

  const APP_NAME = 'BrilliantPro';

  const [user, setUser] = useState({
    email: null,
    role: null,
    id: null
  });

  return (
    <div>
      <Router>
        <Header APP_NAME={APP_NAME} user = {user} setUser = {setUser} />
        <div className='app-container'>
        <Routes>
            <Route path="/" exact element = {<Home user = {user} setUser = {setUser} />} />
            <Route path="/Login" exact element = {<Login setUser = {setUser} />} />
            <Route path="/Register" exact element = {<Register />} />
            <Route path="/CoursesInfo" exact element = {<CoursesInfo />} />
            <Route path="/AddCourse" exact element = {<AddCourse />} />  
            <Route path="/Courses/:id" exact element = {<DisplayCourse />} />   
            <Route path="/Courses/:id/Update" exact element = {<UpdateCourse />} />      
            <Route path="/Courses/:id/Quizzes" exact element = {<Quizzes />} /> 
            <Route path="/Courses/:course_id/Quizzes/:id" exact element = {<DisplayQuiz />} />   
            <Route path="/Courses/:id/Quizzes/new" exact element = {<AddQuiz />} /> 
            <Route path="/Courses/:id/Assessments" exact element = {<Assessments />} />     
            <Route path="/Courses/:id/Assessments/new" exact element = {<AddAssessment />} />  
            <Route path="/Courses/:id/Materials" exact element = {<Materials />} />       
            <Route path="/Courses/:id/Materials/new" exact element = {<AddMaterial />} />  
            <Route path="/Courses/:id/Payment" exact element = {<Card />} />    
            <Route path="/Courses/:id/EnrolledUsers" exact element = {<EnrolledUsers />} />    
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
