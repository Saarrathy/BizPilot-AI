import { useEffect, useState } from "react";
import { Typography, CircularProgress, Box } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import UploadDialog from "../components/Documents/UploadDialog";
import DocumentTable from "../components/Documents/DocumentTable";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.get("/documents/");
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>

      <UploadDialog onSuccess={fetchDocuments} />

      {loading ? (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <DocumentTable
          documents={documents}
          onSuccess={fetchDocuments}
        />
      )}
    </MainLayout>
  );
}