import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Paper, Typography } from "@mui/material";

export default function RevenueChart({ transactions = [] }) {
  // Filter only income transactions
  const incomeTransactions = transactions.filter(
    (item) => item.type === "Income"
  );

  // Group income by month
  const monthlyIncome = {};

  incomeTransactions.forEach((item) => {
    const month = new Date(item.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthlyIncome[month]) {
      monthlyIncome[month] = 0;
    }

    monthlyIncome[month] += Number(item.amount);
  });

  const chartData = Object.keys(monthlyIncome).map((month) => ({
    month,
    revenue: monthlyIncome[month],
  }));

  return (
    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        📈 Monthly Revenue
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              "Revenue",
            ]}
          />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#2e7d32"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}