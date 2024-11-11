import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Fab,
  Grid,
  Divider
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Icon for scroll-to-top button

function GetTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [showArrow, setShowArrow] = useState(false); // State for showing the scroll-to-top button

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        setError("You are not authorized to view any transactions");
      }
    };
    fetchTransactions();
  }, []);

  // Scroll event listener to show or hide the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to return the currency symbol based on the currency code
  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case "USD":
        return "$"; // Dollar
      case "ZAR":
        return "R"; // South African Rand
      case "EUR":
        return "€"; // Euro
      default:
        return ""; // Default case
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#1c1c1c", // Dark background
        color: "white", // White text
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Page Title */}
      <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#fff" }}>
        Transactions
      </Typography>

      {/* Create Transaction Button */}
      <Button
        variant="contained"
        sx={{
          marginBottom: "20px",
          backgroundColor: "#000",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
          "&:hover": {
            backgroundColor: "#333",
          },
        }}
        component={NavLink}
        to="/create"
      >
        Create Transaction
      </Button>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: "20px", width: "100%", maxWidth: "500px" }}>
          {error}
        </Alert>
      )}

      {/* Loading Indicator */}
      {!error && transactions.length === 0 && <CircularProgress sx={{ marginBottom: "20px", color: "white" }} />}

      {/* Transactions List */}
      <Box id="transactions" sx={{ width: "100%", maxWidth: "800px" }}>
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <Card
              key={transaction._id}
              sx={{
                marginBottom: "20px",
                backgroundColor: "#282828", // Darker card background
                color: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow
                borderRadius: "15px", // Rounded corners
                padding: "20px",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
                  Transaction Details
                </Typography>

                {/* Transaction Information */}
                <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>ID Number:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{transaction.IDNumber}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Provider:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{transaction.provider}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Account Number:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{transaction.accountNumber}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Swift Code:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{transaction.swiftCode}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Currency:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">{transaction.currency}</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Amount:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2">
                      {getCurrencySymbol(transaction.currency)}
                      {transaction.amount}
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: "#888" }}>
                      <strong>Status:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="body2"
                      sx={{ color: transaction.status === "Successful" ? "#4caf50" : transaction.status === "Un-Successful" ? "#f44336" : "#ffb300" }}
                    >
                      {transaction.status}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider sx={{ borderColor: "#444", marginBottom: "10px" }} />

                {/* Transaction Buttons */}
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#4caf50", // Green color for the "Edit" button
                      borderColor: "#4caf50",
                      "&:hover": {
                        backgroundColor: "#4caf50",
                        color: "white",
                      },
                    }}
                    component={NavLink}
                    to={`/edit/${transaction._id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#f44336", // Red color for the "Delete" button
                      borderColor: "#f44336",
                      "&:hover": {
                        backgroundColor: "#f44336",
                        color: "white",
                      },
                    }}
                    component={NavLink}
                    to={`/delete/${transaction._id}`}
                  >
                    Delete
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
      </Box>

      {/* Scroll to Top Button */}
      {showArrow && (
        <Fab
          color="primary"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#000",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Box>
  );
}

export default GetTransactions;
