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

export default function AddSaleDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);

  const initialSale = {
    customer_name: "",
    product_name: "",
    quantity: 1,
    unit_price: 0,
    total: 0,
    date: "",
  };

  const [sale, setSale] = useState(initialSale);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedSale = {
      ...sale,
      [name]:
        name === "quantity" || name === "unit_price"
          ? Number(value)
          : value,
    };

    updatedSale.total =
      updatedSale.quantity * updatedSale.unit_price;

    setSale(updatedSale);
  };

  const handleSubmit = async () => {
    try {
      await api.post("/sales/", sale);

      setOpen(false);
      setSale(initialSale);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Failed to add sale");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add Sale
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>Add Sale</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Customer Name"
              name="customer_name"
              value={sale.customer_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Product Name"
              name="product_name"
              value={sale.product_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={sale.quantity}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Unit Price"
              name="unit_price"
              type="number"
              value={sale.unit_price}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Total"
              value={sale.total}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="Date"
              name="date"
              type="date"
              value={sale.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
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