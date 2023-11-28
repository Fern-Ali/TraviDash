import comingsoon from '../static/media/comingsoon.png';
import Box from '@mui/material/Box';
export default function Advanced () {
    return (<Box
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
    ><img src={comingsoon} className="logo" alt="logo" /> </Box>);
};

