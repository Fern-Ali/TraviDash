import React, { useState, useEffect } from "react";
import axios from "axios";
import StripePricingTable from './StripePricingTable';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import SkeletonTypography from './SkeletonTypography';
import Copyright from './Copyright';
import VillageTable from './villageTable';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { purple, red, blue, green, teal, indigo, pink, orange } from '@mui/material/colors';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test public API key.
const stripePromise = loadStripe("pk_test_51OOZ5UIJPiFZsR6yHkkFQ6PXfGEeYeXM9h15V6DbsEkFg7Eo0gZAcOATuhkoyZ6dxKcDTNBfImauZgPp6lotmzHY004sC0epwN");

export default function CheckoutForm() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = React.useState(false)  
  const [clientSecret, setClientSecret] = useState('')
  const handleClose = () => {
      setOpen(false);
  };
  const handleOpen = () => {
      setOpen(true);
  };
  

  useEffect(() => {
    // Create a Checkout Session as soon as the page loads
    setLoading(true)
    axios.post("https://travdex-index.onrender.com/create-checkout-session", {
        // text: dataToBeParsed
    })
      .then((response) => {
        setLoading(false)
        const res = response.data
        console.log(res)
        setClientSecret(res.clientSecret)
    
    })
      .then((data) => console.log(data))
      
  }, []);

  return (
    

      
      <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3} alignItems="center" justifyContent="center">

                    <Grid item xs={12} md={12} lg={10}>
                    <Paper 
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                                width: '100%',
                                backgroundColor: blue[100]                            
                            }}
                        >
                    <StripePricingTable/>
                    </Paper>
                    </Grid>

                    {/* CHARTS HEADER */}

                </Grid>
                <Copyright sx={{ pt: 4 }} />
            </Container>
        </Box>
    
    
  )
}

/// old return

      {/* {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{clientSecret}}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )} */}