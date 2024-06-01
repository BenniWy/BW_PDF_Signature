import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Grid } from "@mui/material";

const DocumentViewer = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setErrorMessage("");
  };

  const handleFileUpload = () => {
    if (!file) {
      setErrorMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { filename } = response.data;
        const url = `/api/document/${filename}`;
        setPdfUrl(url);
        setErrorMessage("");
      })
      .catch((error) => {
        console.error("Error uploading the document:", error);
        setErrorMessage("Error uploading the document");
      });
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          marginTop: 2,
          paddingBottom: 2,
        }}
      >
        Document Viewer
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={5}>
          <input type="file" onChange={handleFileChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Box sx={{ marginTop: 2 }}>
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            width="100%"
            height="600px"
            title="PDF Document"
          />
        )}
      </Box>
    </Box>
  );
};

export default DocumentViewer;
