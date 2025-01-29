import React from 'react';
import { Container, Typography, Button, Grid, Box } from '@mui/material';

const AdminPanel: React.FC = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6">Manage Products</Typography>
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              View Products
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6">Manage Users</Typography>
            <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }}>
              View Users
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminPanel;
