import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import GetTransactions from './components/post/GetTransactions';
import CreateTransactions from './components/post/CreateTransactions';
import EditTransactions from './components/post/EditTransactions';
import DeleteTransactions from './components/post/DeleteTransactions';
import ProtectedPage from './components/ProtectedPage';
import Navbar from './components/navbar';
import Home from './components/Home';
import './App.css';

// Create a Material-UI theme (optional)
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/transactions" element={<GetTransactions />} />
            <Route path="/create" element={<CreateTransactions />} />
            <Route path="/edit/:id" element={<EditTransactions />} />
            <Route path="/delete/:id" element={<DeleteTransactions />} />
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;