import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, Divider, Grid, Fab } from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon } from '@mui/icons-material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { animateScroll as scroll } from 'react-scroll';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [IDNumber, setIDNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('Customer');
  const [error, setError] = useState('');
  const [showArrow, setShowArrow] = useState(false); // show/hide arrow
  const navigate = useNavigate();

  // Check if the user has reached the bottom of the page
  const checkScrollPosition = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 100) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`/api/auth/register`, {
        firstName,
        surname,
        IDNumber,
        accountNumber,
        username,
        email,
        password,
        userRole
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Left Side Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#111',
          padding: '20px',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
            Welcome to WonderBank
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
            Create your account to get started.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: '20px' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: '20px' }}>
            <TextField
              fullWidth
              label="First Name"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              margin="normal"
              autoComplete="on"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <TextField
              fullWidth
              label="Surname"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              margin="normal"
              autoComplete="on"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <TextField
              fullWidth
              label="ID Number"
              id="IDNumber"
              name="IDNumber"
              value={IDNumber}
              onChange={(e) => setIDNumber(e.target.value)}
              required
              margin="normal"
              type="text"
              autoComplete="on"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <TextField
              fullWidth
              label="Account Number"
              id="accountNumber"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              margin="normal"
              type="text"
              autoComplete="on"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <TextField
              fullWidth
              label="Username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              margin="normal"
              autoComplete="on"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              margin="normal"
              type="email"
              autoComplete="on"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <TextField
              fullWidth
              label="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              sx={{
                backgroundColor: '#2c2c2c',
                color: '#fff',
                borderRadius: '5px',
                marginBottom: '20px',
                input: { color: '#fff' },
                label: { color: '#888' },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px 0',
                borderRadius: '30px',
                marginBottom: '20px',
              }}
            >
              Register
            </Button>
          </Box>

          <Divider sx={{ marginBottom: '20px', color: '#888' }}>Or register with</Divider>

          {/* Social Login Buttons */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '30px',
                  padding: '10px 0',
                }}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<AppleIcon />}
                sx={{
                  backgroundColor: '#fff',
                  color: '#000',
                  borderRadius: '30px',
                  padding: '10px 0',
                }}
              >
                Apple
              </Button>
            </Grid>
          </Grid>

          <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '20px', color: '#888' }}>
            Already have an account? <a href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Sign in</a>
          </Typography>
        </Box>
      </Grid>

      {/* Right Side Visualization (with more abstract cards) */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        {/* Abstract visual content */}
        <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <Typography variant="h4" sx={{ marginBottom: '20px' }}>
            Transform Data into Cool Insights
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: '40px', color: '#bbb' }}>
            Harness the power of WonderBank’s advanced tools and insights to drive your business forward.
          </Typography>

          {/* Abstract Cards Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: '#1c1c1c',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'left',
                }}
              >
                <Typography variant="h6" sx={{ color: '#fff', marginBottom: '10px' }}>
                  $11,680
                </Typography>
                <Typography variant="body2" sx={{ color: '#bbb' }}>
                  Closed Won by Type this month
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: '#1c1c1c',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'left',
                }}
              >
                <Typography variant="h6" sx={{ color: '#fff', marginBottom: '10px' }}>
                  24/38
                </Typography>
                <Typography variant="body2" sx={{ color: '#bbb' }}>
                  Payments On Time
                </Typography>
              </Box>
            </Grid>

            {/* More abstract cards */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: '#1c1c1c',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'left',
                }}
              >
                <Typography variant="h6" sx={{ color: '#fff', marginBottom: '10px' }}>
                  92%
                </Typography>
                <Typography variant="body2" sx={{ color: '#bbb' }}>
                  Task Completion Rate
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: '#1c1c1c',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'left',
                }}
              >
                <Typography variant="h6" sx={{ color: '#fff', marginBottom: '10px' }}>
                  3,415
                </Typography>
                <Typography variant="body2" sx={{ color: '#bbb' }}>
                  Sales Targets Achieved
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      {/* Scroll to Top Button */}
      {showArrow && (
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: 'black',
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Grid>
  );
}

export default Register;
