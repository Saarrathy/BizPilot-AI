import api from "../../services/api";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";


export default function CustomerTable({
  customers = [],
  onDelete,
  onEdit,
}) {

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);

      if (onDelete) {
        onDelete();
      }

    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete customer");
    }
  };


  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: 3 }}
    >

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>
              <b>ID</b>
            </TableCell>

            <TableCell>
              <b>Name</b>
            </TableCell>

            <TableCell>
              <b>Email</b>
            </TableCell>

            <TableCell>
              <b>Phone</b>
            </TableCell>

            <TableCell>
              <b>Address</b>
            </TableCell>

            <TableCell align="center">
              <b>Action</b>
            </TableCell>

          </TableRow>

        </TableHead>


        <TableBody>

          {customers.length > 0 ? (

            customers.map((customer) => (

              <TableRow key={customer.id}>

                <TableCell>
                  {customer.id}
                </TableCell>


                <TableCell>
                  {customer.name}
                </TableCell>


                <TableCell>
                  {customer.email}
                </TableCell>


                <TableCell>
                  {customer.phone}
                </TableCell>


                <TableCell>
                  {customer.address}
                </TableCell>



                <TableCell align="center">


                  <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={() => onEdit(customer)}
                  >
                    Edit
                  </Button>



                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(customer.id)}
                  >
                    Delete
                  </Button>


                </TableCell>


              </TableRow>

            ))

          ) : (

            <TableRow>

              <TableCell colSpan={6} align="center">

                <Typography color="text.secondary">
                  No customers found.
                </Typography>

              </TableCell>

            </TableRow>

          )}

        </TableBody>

      </Table>

    </TableContainer>
  );
}