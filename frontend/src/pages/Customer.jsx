  import { useEffect, useState } from "react";
  
  import MainLayout from "../layouts/MainLayout";
  import api from "../services/api";
  
  import {
    Box,
    Typography,
    CircularProgress,
  } from "@mui/material";
  
  
  import AddCustomerDialog from "../components/Customer/AddCustomerDialog";
  import CustomerTable from "../components/Customer/CustomerTable";
  
  
  
  export default function Customer() {
  
  
    const [customers, setCustomers] = useState([]);
  
    const [loading, setLoading] = useState(true);
  
  
  
    // Fetch Customers from Backend
  
    const fetchCustomers = async () => {
    
      try {
      
        setLoading(true);
      
      
        console.log("Fetching customers...");
      
      
        const response = await api.get("/customers/");
      
      
        console.log("Status:", response.status);
      
        console.log("Customers:", response.data);
      
      
      
        setCustomers(response.data);
      
      
      
      } catch (err) {
      
      
        console.error("Customer Error:", err);
      
      
      
        if (err.response) {
        
          console.log("Status:", err.response.status);
        
          console.log("Response:", err.response.data);
        
        }
      
      
      
      } finally {
      
      
        setLoading(false);
      
      
      }
    
    };
  
  
  
  
  
    // Load customers when page opens
  
    useEffect(() => {
    
      fetchCustomers();
    
    }, []);
  
  
  
  
  
  
  
    // Edit button handler
  
    const handleEdit = (customer) => {
    
    
      console.log("Editing Customer:", customer);
    
    
      // Edit dialog connection will be added next
    
    
    };
  
  
  
  
  
  
  
  
    return (
    
      <MainLayout>
      
    
    
        <Box
  
          sx={{
          
            display: "flex",
          
            justifyContent: "space-between",
          
            alignItems: "center",
          
            mb: 4,
          
          }}
        
        >
        
        
        
          <Box>
        
        
            <Typography
  
              variant="h3"
        
              fontWeight="bold"
        
            >
            
              👥 Customer Management
        
            </Typography>
        
        
        
        
            <Typography color="text.secondary">
        
              Manage all your customers
        
            </Typography>
        
        
        
          </Box>
        
        
        
        
        
        
          <AddCustomerDialog
  
            onSuccess={fetchCustomers}
        
          />
  
        
        
        
        
        </Box>
        
        
        
        
        
        
        
        {loading ? (
        
        
        
          <Box
        
            sx={{
            
              display: "flex",
            
              justifyContent: "center",
            
              mt: 5,
            
            }}
          
          >
          
          
            <CircularProgress />
          
          
          </Box>
  
          
          
          
        ) : (
        
        
        
        
          <CustomerTable
        
        
            customers={customers}
        
        
            onDelete={fetchCustomers}
        
        
            onEdit={handleEdit}
        
        
        
          />
        
        
        
        
        )}
  
      
      
      
      
      </MainLayout>
  
    );
  
  }