import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  IconButton,
  Typography,
  Stack,
  Card,
  Avatar,
  Button,
  Box,
  Container,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { addToCart, removeFromCart, emptyCart } from "../store/cart/cartActions";
import "../App.css"; // Ensure this path is correct

const CartSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addedItems = useSelector((state) => state.cartStore.addedItems);
  const total = useSelector((state) => state.cartStore.total);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (total !== undefined) {
      setTotalAmount(`$${total.toFixed(2)}`);
    }
  }, [total]);

  const cartItemRemoveHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const cartItemAddHandler = (item) => {
    const product_item = {
      product: item,
      amount: 1,
    };
    dispatch(addToCart(product_item));
  };

  const handleCheckout = () => {
    navigate("/cart/checkout");
  };

  const handleBackToShop = () => {
    navigate("/home");
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  return (
    <Box className="home-background">
      <Box className="home-content">
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToShop}
              sx={{
                color: "black",
                borderColor: "black",
                "&:hover": {
                  borderColor: "#333333",
                  color: "#333333",
                },
              }}
            >
              Back to Shop
            </Button>
            <Button
              variant="contained"
              startIcon={<ClearAllIcon />}
              onClick={handleEmptyCart}
              sx={{
                backgroundColor: "red",
                color: "white",
                "&:hover": {
                  backgroundColor: "darkred",
                },
              }}
            >
              Clear All Items
            </Button>
          </Grid>
          <Grid container spacing={2} alignItems="flex-start" justifyContent="center">
            <Grid item xs={12} md={10}>
              <Paper
                elevation={3}
                sx={{
                  padding: { xs: 2, md: 3 },
                  borderRadius: 2,
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography variant="h5" align="center" sx={{ marginBottom: 2, color: "#4f3e2b" }}>
                  Your Cart
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{
                    overflow: "auto",
                    maxHeight: 400,
                    marginBottom: 2,
                  }}
                >
                  <Table aria-label="cart table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Net Price</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {addedItems.map((item) => (
                        <TableRow key={item._id} sx={{ borderBottom: '1px solid #ddd' }}>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar src={item.images} variant="square" />
                              <Typography variant="body1">{item.title}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <IconButton
                                aria-label="remove"
                                onClick={cartItemRemoveHandler.bind(null, item._id)}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography>{item.quantity}</Typography>
                              <IconButton
                                aria-label="add"
                                onClick={cartItemAddHandler.bind(null, item)}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Stack>
                          </TableCell>
                          <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleRemoveItem(item._id)}
                              sx={{ color: "red" }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Card
                  elevation={1}
                  sx={{
                    backgroundColor: "#f7f7f7",
                    padding: 2,
                    borderRadius: 1,
                    marginBottom: 2,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h6" color="#4f3e2b">
                      Total Amount:
                    </Typography>
                    <Typography variant="h6" color="#4f3e2b">
                      {totalAmount}
                    </Typography>
                  </Stack>
                </Card>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{
                    backgroundColor: "black",
                    "&:hover": {
                      backgroundColor: "gray",
                    },
                  }}
                >
                  Proceed to Customer Information
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CartSummary;
