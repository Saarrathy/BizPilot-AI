import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import api from "../../services/api";


export default function StatsCards() {


  const [stats, setStats] = useState([
    {
      title: "Total Income",
      value: "₹0",
    },
    {
      title: "Total Expense",
      value: "₹0",
    },
    {
      title: "Customers",
      value: "0",
    },
    {
      title: "Products",
      value: "0",
    },
  ]);




  useEffect(() => {

    fetchStats();

  }, []);




  const fetchStats = async () => {

    try {

      const response = await api.get("/reports/");


      const data = response.data;


      setStats([
        {
          title: "Total Income",
          value: `₹${data.total_income || 0}`,
        },

        {
          title: "Total Expense",
          value: `₹${data.total_expense || 0}`,
        },

        {
          title: "Customers",
          value: data.customers || 0,
        },

        {
          title: "Products",
          value: data.products || 0,
        },
      ]);


    }
    catch(error){

      console.log(
        "Dashboard Stats Error:",
        error
      );

    }

  };




  return (

    <Grid container spacing={3}>

      {stats.map((item)=>(

        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={item.title}
        >

          <Card
            elevation={5}
            sx={{
              borderRadius:3,

              "&:hover":{
                transform:"translateY(-6px)",
              },

              transition:"0.3s"
            }}
          >

            <CardContent>

              <Typography
                color="text.secondary"
              >
                {item.title}
              </Typography>


              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{mt:2}}
              >
                {item.value}
              </Typography>


            </CardContent>

          </Card>

        </Grid>

      ))}

    </Grid>

  );

}