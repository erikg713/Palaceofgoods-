import React from 'react';  
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Home from './pages/Home';  
import About from './pages/About';  
import ProductList from './pages/ProductList';  
import ProductDetail from './pages/ProductDetail';  
import Header from './components/Header';  
import Footer from './components/Footer';  

const App: React.FC = () => {  
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
