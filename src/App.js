import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from './dashboard';
import Login from './login';
import Register from './register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
