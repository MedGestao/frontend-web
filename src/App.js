import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Signup from './pages/signup';
import SecondSignup from './pages/second-signup';
import Appointments from './pages/appointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-second-step" element={<SecondSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
