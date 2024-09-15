import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function FreeTrial() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton color="inherit" onClick={ handleClickOpen }>
                <Badge badgeContent={'!!'} color="secondary">
                    <NotificationsIcon />

                </Badge>
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle align={ 'center' } sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Thank you for visiting us!
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers sx={{ maxWidth: 400 }}>
                    <Typography gutterBottom align={'center'}>
                        TraviDex was crafted by devoted Travian enthusiasts for the community, by the community. This project thrives on your support!
                        
                        
                    </Typography>
                    <Typography gutterBottom align={'center'} >
                        <Box >
                            To optimize its performance, select features will be exclusively offered to
                            TraviDex Plus
                            users starting Jan 1st, 2024.
                            


                        </Box>
                        
                    </Typography>
                    <Typography gutterBottom align={'center' }>
                        Embrace full beta access until then! 
                    </Typography>
                    <Typography gutterBottom align={'center'}>
                        Your journey with us fuels our passion.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} variant='contained'>
                        I Understand
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}