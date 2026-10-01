import { Paper, Typography, List, ListItem, ListItemText } from "@mui/material";

const insights = [
  "Sales increased by 18% this month.",
  "Inventory for Product A is running low.",
  "Customer satisfaction score: 4.8/5.",
  "AI recommends increasing marketing budget by 10%.",
];

export default function AIInsights() {
  return (
    <Paper sx={{ p: 3, height: "100%", borderRadius: 3 }}>
      <Typography variant="h6" gutterBottom>
        🤖 AI Insights
      </Typography>

      <List>
        {insights.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}