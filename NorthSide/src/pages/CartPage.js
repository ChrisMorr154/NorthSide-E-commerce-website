import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import {
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import NavBar from "../components/NavBar";
import CartSummary from "../components/CartSummary";
import CheckoutForm from "../components/CheckoutForm";

const CartPage = () => {
  const navigate = useNavigate();
  const addedItems = useSelector((state) => state.cartStore.addedItems);

  const goBack = () => {
    navigate("/home");
  };

  return (
    <Box sx={{ backgroundColor: "#78866B", minHeight: "100vh" }}>
      <NavBar />
      {addedItems.length !== 0 ? (
        <Routes>
          <Route path="/" element={<CartSummary />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      ) : (
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "calc(100vh - 64px)" }} // Adjusting for NavBar height
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={goBack}
              endIcon={<LocalMallIcon />}
              sx={{
                backgroundColor: "black",
                color: "white",
                "&:hover": {
                  backgroundColor: "#dddddd",
                },
              }}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ color: "#ffffff", marginTop: 2 }}>Cart is Empty</Typography>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default CartPage;
