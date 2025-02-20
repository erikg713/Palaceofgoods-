import React from 'react';  
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  
import Home from './pages/Home';  
import Login from './pages/Login';  
import Register from './pages/Register';  
import Profile from './pages/Profile';  
import ProductList from './pages/ProductList';  
import ProductDetail from './pages/ProductDetail';  
import ShoppingCart from './components/ShoppingCart';  
import Header from './components/Header';  
import Footer from './components/Footer';  
import NotFound from './pages/NotFound'; // Add a 404 page  
import { useStore } from './state/store'; // Import Zustand store  

const App: React.FC = () => {  
  const { user } = useStore(); // Access user from Zustand store  

  return (  
    <Router>  
      <Header />  
      <Routes>  
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />  
        <Route path="/register" element={user ? <Navigate to="/profile" /> : <Register />} />  
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} /> {/* Protected route */}  
        <Route path="/products" element={<ProductList />} />  
        <Route path="/products/:id" element={<ProductDetail />} />  
        <Route path="/cart" element={<ShoppingCart />} />  
        <Route path="*" element={<NotFound />} /> {/* 404 page */}  
      </Routes>  
      <Footer />  
    </Router>  
  );  
};  

export default App; 
