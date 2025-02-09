import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Home from './pages/Home';  
import About from './pages/About';  
import ProductList from './pages/ProductList';  
import ProductDetail from './pages/ProductDetail';  
import Header from './components/Header';  
import Footer from './components/Footer';  
import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Home from './pages/Home';  
import Login from './pages/Login';  
import Register from './pages/Register';  
import Profile from './pages/Profile';  
import ProductList from './pages/ProductList';  
import ProductDetail from './pages/ProductDetail';  
import ShoppingCart from './components/ShoppingCart';  
import Header from './components/Header';  
import Footer from './components/Footer';  
import { StoreProvider } from './state/store';  

const App: React.FC = () => {  
  return (  
    <StoreProvider>  
      <Router>  
        <Header />  
        <Routes>  
          <Route path="/" element={<Home />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
          <Route path="/profile" element={<Profile />} />  
          <Route path="/products" element={<ProductList />} />  
          <Route path="/products/:id" element={<ProductDetail />} />  
          <Route path="/cart" element={<ShoppingCart />} />  
        </Routes>  
        <Footer />  
      </Router>  
    </StoreProvider>  
  );  
};  

export default App;const App: React.FC = () => {  
  return (  
    <Router>  
      <Header />  
      <Routes>  
        <Route path="/" element={<Home />} />  
        <Route path="/about" element={<About />} />  
        <Route path="/products" element={<ProductList />} />  
        <Route path="/products/:id" element={<ProductDetail />} />  
      </Routes>  
      <Footer />  
    </Router>  
  );  
};  

export default App;
