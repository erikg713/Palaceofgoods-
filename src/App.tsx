import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminPanel from "./pages/AdminPanel";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';

const App: React.FC = () => {
  return <h1>Welcome to Palace of Goods!</h1>;
};

export default App;
