import {
  Paper,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#1976D2",
  "#2E7D32",
  "#F57C00",
  "#D32F2F",
  "#7B1FA2",
  "#00838F",
  "#5D4037",
  "#455A64",
];

export default function ExpenseChart({ transactions = [] }) {

  const categoryTotals = {};

  transactions.forEach((item) => {

    if (item.type?.toLowerCase() !== "expense") return;

    const category = item.category || "Others";

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      Number(item.amount || 0);
  });

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        height: 420,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
      >
        📉 Expense by Category
      </Typography>

      {chartData.length === 0 ? (

        <Typography
          align="center"
          sx={{ mt: 10 }}
          color="text.secondary"
        >
          No Expense Data Available
        </Typography>

      ) : (

        <ResponsiveContainer
          width="100%"
          height="90%"
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      )}
    </Paper>
  );
}