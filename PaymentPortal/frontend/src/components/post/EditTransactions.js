import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Alert,
} from "@mui/material";

const statusOptions = ["Pending", "Successful", "Un-Successful"];
const currencyOptions = ["ZAR", "USD", "EUR"];

function EditTransactions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [IDNumber, setIDNumber] = useState("");
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [currency, setCurrency] = useState(currencyOptions[0]);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const transaction = response.data;
        setIDNumber(transaction.IDNumber);
        setProvider(transaction.provider);
        setAccountNumber(transaction.accountNumber);
        setSwiftCode(transaction.swiftCode);
        setCurrency(transaction.currency);
        setAmount(transaction.amount);
        setStatus(transaction.status);
      } catch (error) {
        console.error("Error fetching transaction", error);
        setError("Failed to fetch transaction data");
      }
    };

    fetchTransaction();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/${id}`,
        {
          IDNumber,
          provider,
          accountNumber,
          swiftCode,
          currency,
          amount,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/transactions");
    } catch (error) {
      console.error("Error updating transaction", error);
      setError("Failed to update transaction");
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
        backgroundColor: "#111",
        color: "white",
        padding: "20px",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Edit Transaction
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#1c1c1c",
          padding: "30px",
          borderRadius: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="ID Number"
          value={IDNumber}
          onChange={(e) => setIDNumber(e.target.value)}
          fullWidth
          required
          InputProps={{
            sx: {
              color: "white",
            },
          }}
          sx={{
            backgroundColor: "#2c2c2c",
            borderRadius: "5px",
            label: { color: "#888" },
          }}
        />

        <TextField
          label="Provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: "#2c2c2c",
            borderRadius: "5px",
            input: { color: "white" },
            label: { color: "#888" },
          }}
        />

        <TextField
          label="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: "#2c2c2c",
            borderRadius: "5px",
            input: { color: "white" },
            label: { color: "#888" },
          }}
        />

        <TextField
          label="Swift Code"
          value={swiftCode}
          onChange={(e) => setSwiftCode(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: "#2c2c2c",
            borderRadius: "5px",
            input: { color: "white" },
            label: { color: "#888" },
          }}
        />

        <FormControl fullWidth sx={{ backgroundColor: "#2c2c2c", borderRadius: "5px" }}>
          <InputLabel id="currency-label" sx={{ color: "#888" }}>
            Currency
          </InputLabel>
          <Select
            labelId="currency-label"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            sx={{ color: "white" }}
          >
            {currencyOptions.map((currencyOption) => (
              <MenuItem key={currencyOption} value={currencyOption}>
                {currencyOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: "#2c2c2c",
            borderRadius: "5px",
            input: { color: "white" },
            label: { color: "#888" },
          }}
        />

        <FormControl fullWidth sx={{ backgroundColor: "#2c2c2c", borderRadius: "5px" }}>
          <InputLabel id="status-label" sx={{ color: "#888" }}>
            Status
          </InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ color: "white" }}
          >
            {statusOptions.map((statusOption) => (
              <MenuItem key={statusOption} value={statusOption}>
                {statusOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#000",
            color: "white",
            padding: "10px 0",
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Update Transaction
        </Button>

        <Button
          onClick={() => navigate("/transactions")}
          variant="outlined"
          fullWidth
          sx={{
            color: "white",
            borderColor: "white",
            padding: "10px 0",
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default EditTransactions;
