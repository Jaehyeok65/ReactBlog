import React from 'react';
import {  Route,  Routes, useLocation} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Password1 from './Password1';
import Password2 from './Password2';
import Write from './Write';
import List from './List';
import Contents from './Contents';
import Modify from './Modify';
import '../App.css';


const Trangition = () => {


    const location = useLocation();


    return (
        <>
        <Routes location={location}>
          <Route exact path = '/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Password' element={<Password1 />} />
          <Route path='/Password2' element={<Password2 />} />
          <Route path='/write' element={<Write />} />
          <Route path='/contents' element={<Contents />} />
          <Route path='/modify' element={<Modify />} />
          <Route path='/list' element={<List in = 'true'/>} />
          </Routes>
        </>
    )
}


export default Trangition;