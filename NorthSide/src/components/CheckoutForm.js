import React, { useState, useContext } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FlagIcon from "@mui/icons-material/Flag";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../store/cart/cartActions";
import { generateOrderJSON, generateOrderXML } from "../util/orderTemplates";
import "../App.css"; // Ensure this path is correct

const CheckoutForm = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const addedItems = useSelector((state) => state.cartStore.addedItems);
  const total = useSelector((state) => state.cartStore.total);
  const [totalAmount, setTotalAmount] = useState(`$${total.toFixed(2)}`);
  const [checkoutForm, setCheckoutForm] = useState({
    POnumber: "",
    customerName: "",
    shiptoName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setCheckoutForm({ ...checkoutForm, [name]: value });
  };

  const handleConfirm = async () => {
    const order = {
      POnumber: checkoutForm.POnumber,
      customerName: checkoutForm.customerName,
      shiptoName: checkoutForm.shiptoName,
      address: checkoutForm.address,
      city: checkoutForm.city,
      state: checkoutForm.state,
      country: checkoutForm.country,
      zipCode: checkoutForm.zipCode,
      totalAmount: totalAmount,
      items: addedItems.map(item => ({
        productId: item._id,
        title: item.title,
        quantity: item.quantity,
        price: item.price
      })),
      createdDate: new Date().toISOString(),
    };

    // Generate JSON and XML templates
    const orderJSON = generateOrderJSON(order);
    const orderXML = generateOrderXML(order);

    console.log("Order JSON:", orderJSON);
    console.log("Order XML:", orderXML);

    try {
      const response = await axios.post("http://localhost:5000/order/create", { data: order });
      console.log(response.data);
      setOrderSubmitted(true);
      dispatch(emptyCart());
      navigate("/home");
    } catch (e) {
      console.log(e);
    }
  };

  const handleContinueShopping = () => {
    navigate("/home");
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  return (
    <Box className="home-background">
      <Box className="home-content">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8} lg={7}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
              <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
                PO Shipto Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="PO Number"
                    type="text"
                    name="POnumber"
                    value={checkoutForm.POnumber}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Customer Name"
                    type="text"
                    name="customerName"
                    value={checkoutForm.customerName}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ship-to Name"
                    type="text"
                    name="shiptoName"
                    value={checkoutForm.shiptoName}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    type="text"
                    name="address"
                    value={checkoutForm.address}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HomeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    type="text"
                    name="city"
                    value={checkoutForm.city}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCityIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    type="text"
                    name="state"
                    value={checkoutForm.state}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlagIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    type="text"
                    name="country"
                    value={checkoutForm.country}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Zip Code"
                    type="text"
                    name="zipCode"
                    value={checkoutForm.zipCode}
                    onChange={handleFormInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#4f3e2b" }}>
                      Total: {totalAmount}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={handleConfirm}
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#333333",
                      },
                    }}
                  >
                    Create Order
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Button
                      variant="outlined"
                      onClick={handleContinueShopping}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#dddddd",
                        },
                      }}
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleBackToCart}
                      sx={{
                        borderColor: "black",
                        color: "black",
                        "&:hover": {
                          backgroundColor: "#dddddd",
                        },
                      }}
                    >
                      Back to Cart
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              {orderSubmitted && (
                <Alert severity="success" sx={{ marginTop: 2 }}>
                  Order has been submitted successfully!
                </Alert>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CheckoutForm;
