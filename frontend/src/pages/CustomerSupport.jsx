import React, { useEffect, useState } from "react";
import api from "../services/api";
import MainLayout from "../layouts/MainLayout";
import { Typography, Paper } from "@mui/material";


function CustomerSupport() {

  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    subject: "",
    description: "",
  });


  // Get Tickets
  const fetchTickets = async () => {
    try {
      const response = await api.get("/support/");
      setTickets(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchTickets();
  }, []);



  // Input Change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };



  // Create Ticket
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post("/support/", formData);

      alert("Ticket Created Successfully");


      setFormData({
        customer_name: "",
        email: "",
        subject: "",
        description: "",
      });


      fetchTickets();


    } catch (error) {

      console.log(error);

    }

  };



  return (

    <MainLayout>

      <Typography 
        variant="h3" 
        gutterBottom
      >
        🎧 Customer Support
      </Typography>


      <Paper 
        sx={{ 
          p: 3, 
          mb: 3 
        }}
      >

        <h3>Create Ticket</h3>


        <form onSubmit={handleSubmit}>


          <input
            name="customer_name"
            placeholder="Customer Name"
            value={formData.customer_name}
            onChange={handleChange}
            required
          />

          <br/><br/>


          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <br/><br/>


          <input
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <br/><br/>


          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <br/><br/>


          <button type="submit">
            Create Ticket
          </button>


        </form>


      </Paper>



      <Paper sx={{ p: 3 }}>

        <h3>Tickets</h3>


        <table border="1" width="100%">

          <thead>

            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>

          </thead>


          <tbody>

            {
              tickets.map((ticket) => (

                <tr key={ticket.id}>

                  <td>{ticket.id}</td>

                  <td>{ticket.customer_name}</td>

                  <td>{ticket.subject}</td>

                  <td>{ticket.status}</td>

                </tr>

              ))
            }

          </tbody>


        </table>


      </Paper>


    </MainLayout>

  );

}


export default CustomerSupport;