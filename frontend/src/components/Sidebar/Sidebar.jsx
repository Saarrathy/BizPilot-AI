import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
  Button,
} from "@mui/material";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";


const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", path: "/" },
  { text: "Finance", path: "/finance" },
  { text: "Customers", path: "/customer" },
  { text: "Sales", path: "/sales" },
  { text: "Inventory", path: "/inventory" },
  { text: "HR", path: "/hr" },
  { text: "Reports", path: "/reports" },
  { text: "Documents", path: "/documents" },
  { text: "AI Assistant", path: "/ai-assistant" },
  { text: "Customer Support", path: "/support" },
  { text: "Profile", path: "/profile" },
  { text: "Settings", path: "/settings" },
];


export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();


  const handleLogout = () => {

    // Remove JWT token
    localStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");

  };


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",

          display: "flex",
          flexDirection: "column",
        },
      }}
    >

      <Toolbar />


      {/* Logo */}
      <Box
        sx={{
          p: 2,
          textAlign: "center",
        }}
      >

        <Typography
          variant="h6"
          fontWeight="bold"
        >
          BizPilot AI
        </Typography>

      </Box>


      <Divider />


      {/* Menu */}
      <List
        sx={{
          flexGrow: 1,
        }}
      >

        {menuItems.map((item) => (

          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}

            selected={
              location.pathname === item.path
            }

            sx={{
              "&.Mui-selected": {
                backgroundColor: "#e3f2fd",
              },

              "&.Mui-selected:hover": {
                backgroundColor: "#bbdefb",
              },
            }}
          >

            <ListItemText
              primary={item.text}
            />

          </ListItemButton>

        ))}


      </List>


      <Divider />


      {/* Logout Button */}
      <Box
        sx={{
          p: 2,
        }}
      >

        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={handleLogout}
        >
          Logout
        </Button>

      </Box>


    </Drawer>
  );
}