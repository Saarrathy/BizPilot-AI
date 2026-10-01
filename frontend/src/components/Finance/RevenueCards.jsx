import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SavingsIcon from "@mui/icons-material/Savings";

export default function RevenueCards({ transactions = [] }) {
  const income = transactions
    .filter(
      (t) => t.type && t.type.toLowerCase() === "income"
    )
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = transactions
    .filter(
      (t) => t.type && t.type.toLowerCase() === "expense"
    )
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const profit = income - expense;

  const totalTransactions = transactions.length;

  const averageTransaction =
    totalTransactions === 0
      ? 0
      : Math.round(
          transactions.reduce(
            (sum, t) => sum + Number(t.amount || 0),
            0
          ) / totalTransactions
        );

  const cards = [
    {
      title: "Revenue",
      value: `₹${income.toLocaleString("en-IN")}`,
      color: "#2E7D32",
      icon: <CurrencyRupeeIcon fontSize="large" />,
    },
    {
      title: "Expenses",
      value: `₹${expense.toLocaleString("en-IN")}`,
      color: "#D32F2F",
      icon: <TrendingDownIcon fontSize="large" />,
    },
    {
      title: "Profit",
      value: `₹${profit.toLocaleString("en-IN")}`,
      color: "#1565C0",
      icon: <TrendingUpIcon fontSize="large" />,
    },
    {
      title: "Transactions",
      value: totalTransactions,
      color: "#EF6C00",
      icon: <ReceiptLongIcon fontSize="large" />,
    },
    {
      title: "Average",
      value: `₹${averageTransaction.toLocaleString("en-IN")}`,
      color: "#6A1B9A",
      icon: <SavingsIcon fontSize="large" />,
    },
    {
      title: "Balance",
      value: `₹${profit.toLocaleString("en-IN")}`,
      color: "#00838F",
      icon: <AccountBalanceWalletIcon fontSize="large" />,
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
        mt: 3,
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.title}
          sx={{
            borderRadius: 3,
            boxShadow: 4,
            transition: "0.3s",
            "&:hover": {
              transform: "translateY(-5px)",
            },
          }}
        >
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                >
                  {card.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    color: card.color,
                    mt: 1,
                  }}
                >
                  {card.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  color: card.color,
                }}
              >
                {card.icon}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}