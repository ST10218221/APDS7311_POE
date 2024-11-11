import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function DeleteTransactions() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/transactions");
    } catch (error) {
      console.error("Error deleting transaction", error);
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
      {/* Title */}
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Delete Transaction
      </Typography>

      {/* Confirmation Message */}
      <Typography variant="body1" sx={{ marginBottom: "40px", textAlign: "center", color: "#ccc" }}>
        Are you sure you want to delete this transaction? This action cannot be undone.
      </Typography>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: "20px" }}>
        {/* Delete Button */}
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            padding: "10px 20px",
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          Delete
        </Button>

        {/* Cancel Button */}
        <Button
          onClick={() => navigate("/transactions")}
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
            padding: "10px 20px",
            borderRadius: "30px",
            "&:hover": {
              backgroundColor: "#333",
              borderColor: "#333",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default DeleteTransactions;
