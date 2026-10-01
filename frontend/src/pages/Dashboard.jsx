import MainLayout from "../layouts/MainLayout";
import StatsCards from "../components/Cards/StatsCards";

import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";


export default function Dashboard() {

  return (
    <MainLayout>

      {/* Header */}
      <Box sx={{ mb: 4 }}>

        <Typography
          variant="h3"
          fontWeight="bold"
        >
          Welcome to BizPilot AI
        </Typography>


        <Typography
          variant="subtitle1"
          color="text.secondary"
        >
          AI-Powered Business Management System
        </Typography>

      </Box>



      {/* Statistics */}
      <StatsCards />



      {/* Recent Transactions */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
        >
          💳 Recent Transactions
        </Typography>



        <List>

          <ListItem>
            <ListItemText
              primary="Income Transaction"
              secondary="Business Revenue"
            />
          </ListItem>

          <Divider />


          <ListItem>
            <ListItemText
              primary="Expense Transaction"
              secondary="Business Expense"
            />
          </ListItem>

          <Divider />


          <ListItem>
            <ListItemText
              primary="Sales Activity"
              secondary="Recent customer sales"
            />
          </ListItem>


        </List>


      </Paper>


    </MainLayout>
  );
}