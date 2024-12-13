import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCustomers } from "../store/cust/customerActions";

const CustomerInfoForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers = [], loading, error } = useSelector((state) => state.customer) || {};
  const [checkoutForm, setCheckoutForm] = useState({
    customerName: "",
    shiptoName: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
    const savedForm = localStorage.getItem("checkoutForm");
    if (savedForm) {
      setCheckoutForm(JSON.parse(savedForm));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log('Customers:', customers);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [customers, loading, error]);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...checkoutForm, [name]: value };
    setCheckoutForm(updatedForm);
    localStorage.setItem("checkoutForm", JSON.stringify(updatedForm));
  };

  const handleProceed = () => {
    localStorage.removeItem("checkoutForm");
    navigate("/home");
  };

  return (
    <Box sx={{ backgroundColor: "#78866B", minHeight: "100vh", padding: 3 }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={10} md={8} lg={7}>
          <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
            <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
              Customer Information Form
            </Typography>
            {loading && <p>Loading customers...</p>}
            {error && <p>Error loading customers: {error}</p>}
            <Grid container spacing={3}>
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
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleProceed}
                  sx={{
                    backgroundColor: "black",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  Proceed to Home
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInfoForm;
