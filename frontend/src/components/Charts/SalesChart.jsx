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

const data = [
  { month: "Jan", sales: 420 },
  { month: "Feb", sales: 580 },
  { month: "Mar", sales: 720 },
  { month: "Apr", sales: 850 },
  { month: "May", sales: 1100 },
  { month: "Jun", sales: 1450 },
];

export default function SalesChart() {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        📈 Sales Analytics
      </Typography>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#1976d2"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}