import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';  
import Info from './Info';
import Favorites from './Favorites';
import Readed from './Readed';

function AppRouter() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
           
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
            <Route
            path="/Info/:rank"
            element={
              <ProtectedRoute>
                <Info />
              </ProtectedRoute>
            }
          />

        <Route
            path="/Favorites"
            element={
              
                <Favorites />
            }
          />

        <Route
            path="/Readed"
            element={
              
                <Readed/>
            }
          />

         
        </Routes>
      </div>
    </Router>
  );
}

export default AppRouter;
