import * as React from 'react';
import { styled } from '@mui/material/styles';
/*import Button from '@mui/material-next/Button';*/
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import { purple, blue, teal, pink } from '@mui/material/colors';


import { red } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import { green } from '@mui/material/colors';


const ColorButton = styled(Button)(({ theme, bg, fg, myColor }) => ({
    
    color: myColor || theme.palette.getContrastText(purple[500]),
   /* backgroundColor: bg || purple[500],*/
    backgroundColor: bg || purple[500],
    '&:hover': {
        backgroundColor: fg || purple[700],
    },
}));


export default ColorButton;

// JavaScript source code
