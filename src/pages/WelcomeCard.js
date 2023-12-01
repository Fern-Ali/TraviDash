import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function WelcomeCard() {
    return (
      <ResponsiveContainer minWidth='150px' >
      <Card sx={{ height: '100%'}}>
         
              <CardContent >

              <Typography variant="h7" component="div" align='center'>
                        {/*be{bull}nev{bull}o{bull}lent*/}Raiders' ToolBox
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} align='center' color="text.secondary" gutterBottom>
                      Built by top raiders, for top raiders!

                  </Typography>
                  {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                  {/*  adjective*/}
                  {/*</Typography>*/}
                  <Typography variant="body2" align='center'>
                      Explore TraviDex

                  </Typography>
                  <Typography variant="body2" color="text.secondary" align='center'>

                  {`Start by adding farms` }
                  </Typography>
                  <CardActions>
                        <Button href="finder" variant='outlined' startIcon={<ScreenSearchDesktopIcon /> } size="small">Inactives</Button>
                        <Button href="advanced" variant='outlined' startIcon={<TravelExploreIcon /> } size="small">Advanced</Button>
                  </CardActions>
              </CardContent>
          
      
      
            </Card>
        </ResponsiveContainer>
  );
}// JavaScript source code
