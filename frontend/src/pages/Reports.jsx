import { useEffect, useState } from "react";
import { Typography, CircularProgress, Box, Alert } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import SummaryCards from "../components/Reports/SummaryCards";
import RevenueChart from "../components/Reports/RevenueChart";
import ExpenseChart from "../components/Reports/ExpenseChart";

export default function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await api.get("/reports/");

      console.log("Report Data:", response.data);

      setReport(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <Typography variant="h4" gutterBottom>
        Business Reports
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && report && (
        <>
          <SummaryCards report={report} />

          <RevenueChart report={report} />

          <ExpenseChart report={report} />
        </>
      )}
    </MainLayout>
  );
}