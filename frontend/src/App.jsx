import React from "react";
import { Container } from "@mui/material";
import DocumentViewer from "./components/DocumentViewer";
import SignatureWizard from "./components/SignatureWizard";

const App = () => {
  return (
    <Container>
      <DocumentViewer />
      <SignatureWizard />
    </Container>
  );
};

export default App;
