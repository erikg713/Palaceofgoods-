import React from 'react';  
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';  
import { Link, useNavigate } from 'react-router-dom';  
import { useStore } from '../state/store';  

const Header: React.FC = () => {  
  const { user, logout } = useStore(); // Add logout function to Zustand store  
  const navigate = useNavigate();  

  const handleLogout = () => {  
    logout(); // Call logout function  
    navigate('/login'); // Redirect to login page  
  };  

  return (  
    <AppBar position="static">  
      <Toolbar>  
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>  
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>  
            Palace of Goods  
          </Link>  
        </Typography>  
        <Box>  
          <Button color="inherit" component={Link} to="/">  
            Home  
          </Button>  
          <Button color="inherit" component={Link} to="/products">  
            Products  
          </Button>  
          <Button color="inherit" component={Link} to="/cart">  
            Cart  
          </Button>  
          {user ? (  
            <>  
              <Button color="inherit" component={Link} to="/profile">  
                Profile  
              </Button>  
              <Button color="inherit" onClick={handleLogout}>  
                Logout  
              </Button>  
            </>  
          ) : (  
            <>  
              <Button color="inherit" component={Link} to="/login">  
                Login  
              </Button>  
              <Button color="inherit" component={Link} to="/register">  
                Register  
              </Button>  
            </>  
          )}  
        </Box>  
      </Toolbar>  
    </AppBar>  
  );  
};  

export default Header; 
