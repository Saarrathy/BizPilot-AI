import { Grid, Paper, Typography } from "@mui/material";

export default function SummaryCards({ report }) {
  const cards = [
    {
      title: "Total Revenue",
      value: `₹${report?.total_income ?? 0}`,
    },
    {
      title: "Total Expenses",
      value: `₹${report?.total_expense ?? 0}`,
    },
    {
      title: "Customers",
      value: report?.customers ?? 0,
    },
    {
      title: "Sales",
      value: report?.sales ?? 0,
    },
    {
      title: "Products",
      value: report?.products ?? 0,
    },
    {
      title: "Employees",
      value: report?.employees ?? 0,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      {cards.map((card, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h6">
              {card.title}
            </Typography>

            <Typography variant="h4" sx={{ mt: 1 }}>
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}