import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';
import Register from './register';
import SecondRegister from './second-register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-second-step" element={<SecondRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
