import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Alert,
  Modal,
  Grid,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const statusOptions = ["Pending", "Successful", "Un-Successful"];
const currencyOptions = ["ZAR", "USD", "EUR"];

function ConfirmationModal({ open, handleClose, details, handleConfirm }) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Confirm Transaction</Typography>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Are you sure you want to create this transaction?
        </Typography>
        <Typography variant="body2">
          <strong>ID Number:</strong> {details.IDNumber}
        </Typography>
        <Typography variant="body2">
          <strong>Provider:</strong> {details.provider}
        </Typography>
        <Typography variant="body2">
          <strong>Currency:</strong> {details.currency}
        </Typography>
        <Typography variant="body2">
          <strong>Amount:</strong> ${details.amount}
        </Typography>
        <Typography variant="body2">
          <strong>Status:</strong> {details.status}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          sx={{ marginTop: "20px", width: "100%" }}
        >
          Confirm
        </Button>
      </Box>
    </Modal>
  );
}

function CreateTransactions() {
  const [IDNumber, setIDNumber] = useState("");
  const [provider, setProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [amount, setAmount] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);
  const [transactions, setTransactions] = useState([]); // Store created transactions
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // State for the modal
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true); // Open the modal to confirm the transaction
  };

  const handleConfirm = async () => {
    setOpen(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api",
        {
          IDNumber,
          provider,
          accountNumber,
          swiftCode,
          currency: selectedCurrency,
          amount,
          status: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions([...transactions, { IDNumber, provider, accountNumber, swiftCode, currency: selectedCurrency, amount, status: selectedStatus }]);
      resetForm();
      setError("");
      navigate("/transactions");
    } catch (error) {
      setError("Error creating transaction");
    }
  };

  const resetForm = () => {
    setIDNumber("");
    setProvider("");
    setAccountNumber("");
    setSwiftCode("");
    setAmount("");
    setSelectedCurrency(currencyOptions[0]);
    setSelectedStatus(statusOptions[0]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: "#111", // Dark background for consistency
        color: "white", // White text for contrast
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "20px", color: "white" }}>
        Create a New Transaction
      </Typography>

      {/* Error Message */}
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
          backgroundColor: "#1c1c1c", // Darker form background
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
            startAdornment: <AccountCircle sx={{ color: "#888" }} />,
          }}
          sx={{
            backgroundColor: '#2c2c2c',
            borderRadius: '5px',
            '& .MuiInputBase-input': {
              color: '#fff',
            },
            '& .MuiInputLabel-root': {
              color: '#888',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#444',
              },
              '&:hover fieldset': {
                borderColor: '#888',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4caf50',
              },
            },
          }}
        />

        <TextField
          label="Provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: '#2c2c2c',
            borderRadius: '5px',
            input: { color: '#fff' },
            label: { color: '#888' },
          }}
        />

        <TextField
          label="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: '#2c2c2c',
            borderRadius: '5px',
            input: { color: '#fff' },
            label: { color: '#888' },
          }}
        />

        <TextField
          label="Swift Code"
          value={swiftCode}
          onChange={(e) => setSwiftCode(e.target.value)}
          fullWidth
          required
          sx={{
            backgroundColor: '#2c2c2c',
            borderRadius: '5px',
            input: { color: '#fff' },
            label: { color: '#888' },
          }}
        />

        <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#2c2c2c", borderRadius: "5px" }}>
          <InputLabel id="currency-label" sx={{ color: "#888" }}>
            Currency
          </InputLabel>
          <Select
            labelId="currency-label"
            label="Currency"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            fullWidth
            sx={{ color: "#fff" }}
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
            input: { color: "#fff" },
            label: { color: "#888" },
          }}
        />

        <FormControl fullWidth variant="outlined" sx={{ backgroundColor: "#2c2c2c", borderRadius: "5px" }}>
          <InputLabel id="status-label" sx={{ color: "#888" }}>
            Status
          </InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            fullWidth
            sx={{ color: "#fff" }}
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
            color: "#fff",
            padding: "10px 0",
            borderRadius: "30px",
          }}
        >
          Create Transaction
        </Button>
      </Box>

      <ConfirmationModal
        open={open}
        handleClose={() => setOpen(false)}
        details={{ IDNumber, provider, accountNumber, swiftCode, currency: selectedCurrency, amount, status: selectedStatus }}
        handleConfirm={handleConfirm}
      />
    </Box>
  );
}

export default CreateTransactions;
