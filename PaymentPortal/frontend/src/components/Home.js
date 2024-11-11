import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';

const HomePage = () => {
    return (
        <Box sx={{ backgroundColor: '#000', color: 'white', minHeight: '100vh', padding: '50px 0' }}>
            {/* Hero Section */}
            <Container>
                <Box sx={{ textAlign: 'center', marginBottom: '100px' }}>
                    <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '4rem', marginBottom: '20px' }}>
                        Your money is <br /> where you are
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', marginBottom: '40px' }}>
                        Spend, save and manage your money, all in one place. Open a full bank account from your phone, for free.
                    </Typography>
                    <Button
                        component="a"
                        href="/login#login"
                        variant="contained"
                        size="large"
                        sx={{ backgroundColor: 'white', color: 'black', borderRadius: '50px', padding: '10px 40px' }}
                    >
                        Open WonderBank Account
                    </Button>
                </Box>
            </Container>

            {/* Credit Score Management Section */}
            <Container>
                <Box sx={{ marginBottom: '40px' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                        Credit Score Management
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#b0b0b0', marginBottom: '20px' }}>
                        Track and improve your credit status
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                        <Button variant="contained" sx={{ borderRadius: '30px', backgroundColor: '#1c1c1c', color: '#fff' }}>
                            Transaction Score
                        </Button>
                        <Button variant="contained" sx={{ borderRadius: '30px', backgroundColor: '#1c1c1c', color: '#fff' }}>
                            Payments on Time
                        </Button>
                        <Button variant="contained" sx={{ borderRadius: '30px', backgroundColor: '#1c1c1c', color: '#fff' }}>
                            Credit Utilization
                        </Button>
                    </Box>
                </Box>

                {/* Credit Score and Financial Info - Abstract Card Layout */}
                <Grid container spacing={4} alignItems="stretch">
                    {/* Credit Score */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: '#fff', height: '100%' }}>
                            <CardContent>
                                <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                                    630
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#4caf50', marginBottom: '10px' }}>
                                    +5 pts
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: '10px' }}>
                                    5 days ago
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#b0b0b0' }}>
                                    Excellent
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Payments on Time */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: '#fff', height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                                    Payments On Time
                                </Typography>
                                <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                                    24/38
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                    Last Updated: 2 days ago
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Smart Credit */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: '#fff', height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                                    Smart Credit
                                </Typography>
                                <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                                    $120,000
                                </Typography>
                                <Typography variant="body2">
                                    Paid Amount
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                    50/mo installments
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Credit Utilization */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: '#fff', height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                                    Credit Utilization
                                </Typography>
                                <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                                    22%
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                    Based on last 6 months
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recent Changes */}
                    <Grid item xs={12} md={6}>
                        <Card sx={{ backgroundColor: '#1c1c1c', color: '#fff', height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                                    Recent Changes
                                </Typography>
                                <Typography variant="h3" sx={{ marginBottom: '10px' }}>
                                    +15 pts
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#b0b0b0' }}>
                                    Over the last month
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;