import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Typography, Grid, TextField } from "@mui/material";

const DocumentViewer = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSelectedFileName(selectedFile ? selectedFile.name : "");
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
        setErrorMessage("Error uploading the document", error);
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
        <Grid item xs={12} sm={6} container alignItems="center">
          <input
            accept="application/pdf"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="contained-button-file"
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              component="span"
              color="primary"
              margin="normal"
            >
              Choose File
            </Button>
          </label>
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {selectedFileName}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFileUpload}
            margin="normal"
          >
            Upload
          </Button>
        </Grid>
      </Grid>
      {errorMessage && (
        <Typography
          variant="body2"
          color="error"
          sx={{ marginLeft: 1, marginTop: 2 }}
        >
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
