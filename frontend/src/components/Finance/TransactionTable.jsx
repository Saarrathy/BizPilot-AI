import { useMemo, useState } from "react";
import api from "../../services/api";

import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TransactionTable({
  transactions = [],
  onDelete,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const value =
        `${item.title} ${item.category} ${item.type}`.toLowerCase();

      return value.includes(search.toLowerCase());
    });
  }, [transactions, search]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/finance/transactions/${id}`);

      alert("Transaction deleted successfully.");

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete transaction.");
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
        📋 Recent Transactions
      </Typography>

      <TextField
        fullWidth
        size="small"
        label="Search Transaction"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell align="right">
                <strong>Amount</strong>
              </TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.title}</TableCell>

                    <TableCell>{row.category}</TableCell>

                    <TableCell>
                      <Chip
                        label={row.type}
                        color={
                          row.type.toLowerCase() === "income"
                            ? "success"
                            : "error"
                        }
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="right">
                      ₹{Number(row.amount).toLocaleString("en-IN")}
                    </TableCell>

                    <TableCell>{row.date}</TableCell>

                    <TableCell align="center">
                      <Tooltip title="Edit">
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </Paper>
  );
}