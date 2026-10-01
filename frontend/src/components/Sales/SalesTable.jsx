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

export default function SalesTable({
  sales = [],
  onDelete,
}) {
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale?")) return;

    try {
      await api.delete(`/sales/${id}`);

      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Failed to delete sale");
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
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Customer</b></TableCell>
            <TableCell><b>Product</b></TableCell>
            <TableCell align="center"><b>Quantity</b></TableCell>
            <TableCell align="right"><b>Unit Price</b></TableCell>
            <TableCell align="right"><b>Total</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.id}</TableCell>
                <TableCell>{sale.customer_name}</TableCell>
                <TableCell>{sale.product_name}</TableCell>
                <TableCell align="center">{sale.quantity}</TableCell>
                <TableCell align="right">
                  ₹{Number(sale.unit_price).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  ₹{Number(sale.total).toFixed(2)}
                </TableCell>
                <TableCell>{sale.date}</TableCell>

                <TableCell align="center">
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(sale.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <Typography color="text.secondary">
                  No sales found.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}