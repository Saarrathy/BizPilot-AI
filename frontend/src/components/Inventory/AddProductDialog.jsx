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

export default function AddProductDialog({ onSuccess }) {
  const [open, setOpen] = useState(false);

  const initialProduct = {
    product_name: "",
    category: "",
    quantity: 0,
    price: 0,
  };

  const [product, setProduct] = useState(initialProduct);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]:
        name === "quantity" || name === "price"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/inventory/", product);

      setOpen(false);
      setProduct(initialProduct);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Failed to add product");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add Product
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
      >
        <DialogTitle>Add Product</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <TextField
              label="Product Name"
              name="product_name"
              value={product.product_name}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Category"
              name="category"
              value={product.category}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
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