import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll'; 
import { NavLink, useLocation } from 'react-router-dom'; 

const Navbar = () => {
    const location = useLocation();

    // Smooth scroll to the section when navigating to a new route
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.replace('#', ''));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'black', padding: '20px' }}>
            <Toolbar sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box
                        component="img"
                        src="/WonderBanklogo.png"
                        alt="WonderBank Logo"
                        sx={{ width: '200px', height: '200px' }}
                    />
                    <Typography variant="h3" sx={{ color: 'white', textAlign: 'center', marginLeft: '-40px', marginRight: '100px' }}>
                        WonderBank
                    </Typography>
                </Box>

                {/* Navigation */}
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
                    {/* Smooth Scroll to the Home section */}
                    <NavLink to="/home#home" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Home
                    </NavLink>


                    {/* Navigate to Register page */}
                    <Button color="inherit">
                        <NavLink to="/register#register" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Register
                        </NavLink>
                    </Button>

                    {/* Navigate to Login page */}
                    <Button color="inherit">
                        <NavLink to="/login#login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Login
                        </NavLink>
                    </Button>

                    {/* Navigate to Transactions page */}
                    <Button color="inherit">
                        <NavLink to="/transactions#transactions" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Transactions
                        </NavLink>
                    </Button>

                    {/* Navigate to Protected page */}
                    <Button color="inherit">
                        <NavLink to="/protected#protected" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Protected
                        </NavLink>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;