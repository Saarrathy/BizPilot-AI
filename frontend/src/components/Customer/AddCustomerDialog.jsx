import { useState } from "react";
import api from "../../services/api";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
} from "@mui/material";


export default function AddCustomerDialog({ onSuccess }) {

  const [open, setOpen] = useState(false);


  const initialCustomer = {
    name: "",
    email: "",
    phone: "",
    address: "",
  };


  const [customer, setCustomer] = useState(initialCustomer);



  const handleChange = (e) => {

    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });

  };




  const handleSubmit = async () => {


    if (!customer.name || !customer.email) {

      alert("Name and Email are required");

      return;

    }



    try {


      console.log("Sending Customer:", customer);



      const response = await api.post(
        "/customers/",
        customer
      );



      console.log("Customer Added:", response.data);



      setOpen(false);


      setCustomer(initialCustomer);



      if (onSuccess) {

        onSuccess();

      }



    } catch (err) {


      console.error("Add Customer Error:", err);



      if (err.response) {

        console.log("Status:", err.response.status);

        console.log("Response:", err.response.data);

      }



      alert("Failed to add customer");


    }


  };




  return (

    <>

      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add Customer
      </Button>





      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >


        <DialogTitle>
          Add Customer
        </DialogTitle>




        <DialogContent>

          <Stack spacing={2} sx={{ mt: 2 }}>


            <TextField
              label="Name"
              name="name"
              value={customer.name}
              onChange={handleChange}
              fullWidth
            />



            <TextField
              label="Email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              fullWidth
            />



            <TextField
              label="Phone"
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              fullWidth
            />



            <TextField
              label="Address"
              name="address"
              value={customer.address}
              onChange={handleChange}
              fullWidth
            />


          </Stack>


        </DialogContent>





        <DialogActions>


          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>



          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>



        </DialogActions>



      </Dialog>


    </>

  );

}