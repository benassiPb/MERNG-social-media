import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth'
// import AuthRoute from './util/AuthRoute'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MenuBar from './components/Menu';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/login' element=
              {<Login />} />
            <Route exact path='/register' element=
              {<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}


