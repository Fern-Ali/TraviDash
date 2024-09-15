import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
      <Card sx={{ minWidth: 100, justifyContent: 'center' }}>
         
              <CardContent >

                  <Typography variant="h7" component="div">
                      {/*be{bull}nev{bull}o{bull}lent*/}Welcome to TraviDex!
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Built by top raiders, for top raiders!

                  </Typography>
                  {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                  {/*  adjective*/}
                  {/*</Typography>*/}
                  <Typography variant="body2" >
                      Explore our Tools

                  </Typography>
                  <Typography variant="body2" color="text.secondary">

                  {`Start by adding farms` }
                  </Typography>
                  <CardActions>
                  <Button startIcon={<TravelExploreIcon /> } size="small">Learn More</Button>
                  </CardActions>
              </CardContent>
          
      
      
    </Card>
  );
}// JavaScript source code
