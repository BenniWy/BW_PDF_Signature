import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const DocumentViewer = () => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    axios
      .get("/api/document", { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        setPdfUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching the document:", error);
      });
  }, []);

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
      {pdfUrl && (
        <iframe src={pdfUrl} width="100%" height="600px" title="PDF Document" />
      )}
    </Box>
  );
};

export default DocumentViewer;
