import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";

import api from "../../services/api";

export default function DocumentTable({ documents, onSuccess }) {

  const handleDelete = async (id) => {
    try {
      await api.delete(`/documents/${id}`);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>

      <Table>

        <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>File Name</b></TableCell>
            <TableCell><b>File Path</b></TableCell>
            <TableCell><b>File Type</b></TableCell>
            <TableCell><b>Upload Date</b></TableCell>
            <TableCell align="center"><b>Action</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {documents.length === 0 ? (

            <TableRow>
              <TableCell colSpan={6} align="center">
                No Documents Found
              </TableCell>
            </TableRow>

          ) : (

            documents.map((doc) => (

              <TableRow key={doc.id}>

                <TableCell>{doc.id}</TableCell>

                <TableCell>{doc.file_name}</TableCell>

                <TableCell>{doc.file_path}</TableCell>

                <TableCell>{doc.file_type}</TableCell>

                <TableCell>
                  {new Date(doc.upload_date).toLocaleDateString()}
                </TableCell>

                <TableCell align="center">

                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => handleDelete(doc.id)}
                  >
                    Delete
                  </Button>

                </TableCell>

              </TableRow>

            ))

          )}

        </TableBody>

      </Table>

    </Paper>
  );
}