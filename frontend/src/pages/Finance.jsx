import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { exportToExcel } from "../utils/exportExcel";

import {
  Box,
  Typography,
  Paper,
  Divider,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import DownloadIcon from "@mui/icons-material/Download";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import RevenueCards from "../components/Finance/RevenueCards";
import RevenueChart from "../components/Finance/RevenueChart";
import ExpenseChart from "../components/Finance/ExpenseChart";
import TransactionTable from "../components/Finance/TransactionTable";

import AddIncomeDialog from "../components/Finance/AddIncomeDialog";
import AddExpenseDialog from "../components/Finance/AddExpenseDialog";

export default function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      console.log("Fetching transactions...");

      const response = await api.get("/finance/transactions");

      console.log("Status:", response.status);
      console.log("Data:", response.data);

      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Finance Error:", err);

      if (err.response) {
        console.log(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    console.log("Transactions Updated:", transactions);
  }, [transactions]);

  return (
    <MainLayout>
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h3" fontWeight="bold">
            💰 Finance Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome to BizPilot AI Finance Management
          </Typography>
        </Box>

        <Typography color="primary">
          {new Date().toLocaleDateString()}
        </Typography>
      </Box>

      {/* Loading */}

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          mt={8}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Debug */}

          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">
              Transactions Loaded : {transactions.length}
            </Typography>
          </Paper>

          {/* Buttons */}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 4,
            }}
          >
            <AddIncomeDialog onSuccess={fetchTransactions} />

            <AddExpenseDialog onSuccess={fetchTransactions} />
          </Box>

          {/* Revenue Cards */}

          <RevenueCards transactions={transactions} />

          {/* Charts */}

          <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
          >
            <Grid item xs={12} md={6}>
              <RevenueChart
                transactions={transactions}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ExpenseChart
                transactions={transactions}
              />
            </Grid>
          </Grid>

          {/* Quick Actions */}

          <Paper
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              ⚡ Quick Actions
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                startIcon={<ReceiptLongIcon />}
              >
                New Invoice
              </Button>

              <Button
                variant="contained"
                color="success"
                startIcon={<TrendingUpIcon />}
              >
                Profit Report
              </Button>

              <Button
                variant="contained"
                color="warning"
                startIcon={<DownloadIcon />}
                onClick={() => exportToExcel(transactions)}
              >
                Export Excel
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<AssessmentIcon />}
              >
                Financial Analytics
              </Button>

            </Box>
          </Paper>
                    {/* AI Financial Insights */}

          <Paper
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
            >
              🤖 AI Financial Insights
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {(() => {
              const income = transactions
                .filter((t) => t.type === "Income")
                .reduce((sum, t) => sum + Number(t.amount), 0);

              const expense = transactions
                .filter((t) => t.type === "Expense")
                .reduce((sum, t) => sum + Number(t.amount), 0);

              const profit = income - expense;

              const savings =
                income > 0
                  ? ((profit / income) * 100).toFixed(1)
                  : 0;

              let message = "";

              if (income === 0) {
                message =
                  "Start adding income transactions to receive AI insights.";
              } else if (profit < 0) {
                message =
                  "⚠️ Your expenses are higher than your income. Consider reducing unnecessary spending.";
              } else if (Number(savings) >= 50) {
                message =
                  "🎉 Excellent! Your savings rate is above 50%. Keep it up!";
              } else if (Number(savings) >= 20) {
                message =
                  "👍 Good financial health. Try to increase your savings even more.";
              } else {
                message =
                  "💡 Your savings rate is low. Review your monthly expenses.";
              }

              return (
                <>
                  <Typography sx={{ mb: 1 }}>
                    💰 <strong>Total Income:</strong> ₹
                    {income.toLocaleString("en-IN")}
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    💸 <strong>Total Expense:</strong> ₹
                    {expense.toLocaleString("en-IN")}
                  </Typography>

                  <Typography sx={{ mb: 1 }}>
                    📈 <strong>Net Profit:</strong> ₹
                    {profit.toLocaleString("en-IN")}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    💵 <strong>Savings Rate:</strong> {savings}%
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography
                    color="primary"
                    fontWeight="bold"
                  >
                    {message}
                  </Typography>
                </>
              );
            })()}
          </Paper>

          {/* Transactions */}

          <TransactionTable
            transactions={transactions}
            onDelete={fetchTransactions}
          />
        </>
      )}
    </MainLayout>
  );
}