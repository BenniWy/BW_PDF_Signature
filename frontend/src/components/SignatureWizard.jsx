import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const SignatureWizard = () => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  const handleSignature = () => {
    axios
      .post("/api/signature", { name, pin: parseInt(pin, 10) })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage(
          error.response
            ? error.response.data.message
            : "Error collecting signature"
        );
      });
  };

  return (
    <Box>
      <Typography variant="h4">Signature Wizard</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSignature}>
            Submit
          </Button>
        </Grid>
        {message && (
          <Grid item xs={12} sx={{ marginLeft: 1 }}>
            <Typography variant="body" color="secondary">
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SignatureWizard;
