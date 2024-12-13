import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton, Badge, Tooltip, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/authContext";
import logo from "../img/home.png";
import ContactPage from "../pages/ContactPage"; // Import the ContactPage component

const NavBar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const addedItems = useSelector((state) => state.cartStore.addedItems);
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [contactOpen, setContactOpen] = useState(false); // State to handle dialog

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const goToHome = () => {
    navigate("/home");
  };

  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  const goToLogin = () => {
    navigate("/");
  };

  const logOut = () => {
    localStorage.clear();
    setIsAdmin();
    setToken();
    authContext.logout();
    navigate("/");
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  const goToElectronicOrderSubmission = () => {
    navigate("/electronic-order-submission");
  };

  const handleContactOpen = () => {
    setContactOpen(true);
  };

  const handleContactClose = () => {
    setContactOpen(false);
  };

  // Calculate the total number of pairs in the cart
  const totalPairs = addedItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(90deg, #434343 0%, #000000 100%)', boxShadow: 3 }}>
        <Toolbar>
          <Tooltip title="Home">
            <IconButton onClick={goToHome} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" } }}>
              <Box component="img" sx={{ width: "40px", height: "40px" }} src={logo} />
            </IconButton>
          </Tooltip>
          {token && isAdmin === "false" && (
            <Tooltip title="Orders">
              <IconButton onClick={goToOrders} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, ml: 2 }}>
                <ListAltIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          )}
          {isAdmin === "false" && (
            <Tooltip title="Cart">
              <IconButton onClick={goToCart} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, ml: 2 }}>
                <Badge badgeContent={totalPairs} sx={{ "& .MuiBadge-badge": { backgroundColor: "#FFD700", color: "#000000" } }}>
                  <ShoppingCartIcon sx={{ fontSize: 30 }} />
                </Badge>
              </IconButton>
            </Tooltip>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#ffffff", textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial', letterSpacing: 2 }}>
          </Typography>
          <Tooltip title="Electronic Order Submission">
            <IconButton onClick={goToElectronicOrderSubmission} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, mr: 2 }}>
              <AddCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Contact Us">
            <IconButton onClick={handleContactOpen} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, mr: 2 }}>
              <ContactMailIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
          {token && isAdmin === "true" && (
            <Tooltip title="Add Product">
              <IconButton onClick={goToAddProduct} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, mr: 2 }}>
                <AddCircleIcon sx={{ fontSize: 30 }} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {!token ? (
              <Button onClick={goToLogin} startIcon={<LoginIcon />} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, fontWeight: 'bold' }}>
                Login
              </Button>
            ) : (
              <Button onClick={logOut} startIcon={<LogoutIcon />} sx={{ color: "#ffffff", "&:hover": { color: "#FFD700" }, fontWeight: 'bold' }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={contactOpen} onClose={handleContactClose} fullWidth maxWidth="sm">
        <DialogTitle>Contact Us</DialogTitle>
        <DialogContent>
          <ContactPage />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NavBar;
