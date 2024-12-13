import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Stack,
  Button,
  IconButton,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../store/cart/cartActions";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(props.product);
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [quantity, setQuantity] = useState("");
  const amountInputRef = useRef();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";
    setToken(storedToken);
    setIsAdmin(storedIsAdmin);
  }, []);

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete/${id}`);
      if (response.data === "Product deleted!") {
        props.getProduct();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToCart = () => {
    const quantityNumber = parseInt(quantity, 10);
    if (quantityNumber > product.stock) {
      setWarningMessage(`Cannot add more than ${product.stock} items to the cart.`);
    } else {
      setWarningMessage("");
      const productItem = {
        product: product,
        amount: quantityNumber,
      };
      dispatch(addToCart(productItem));
    }
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    const quantityNumber = parseInt(value, 10);
    if (value === "" || quantityNumber <= product.stock) {
      setWarningMessage("");
    } else if (quantityNumber > product.stock) {
      setWarningMessage(`Cannot add more than ${product.stock} items to the cart.`);
    }
    setQuantity(value);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: '80%',
        margin: 'auto',
        borderRadius: 3,
        boxShadow: 6,
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        height: 'auto', // Decreased the height
      }}
    >
      <Box
      sx={{
        width: { xs: '100%', md: '40%' },
        bgcolor: 'rgba(255, 241, 230, 0.8)', // Light creamy color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid rgba(79, 62, 43, 0.8)',
        borderRadius: { xs: 0, md: 2 },
        padding: 1,
      }}
    >
      <Box
        sx={{
          bgcolor: 'white', // White background inside the border
          border: '2px solid lightgrey', // Light grey border
          borderRadius: 1,
          padding: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          image={product.images}
          alt="Product image"
          sx={{
            objectFit: 'contain',
            maxHeight: '150px', // Decreased the height of the image container
            maxWidth: '100%',
          }}
        />
        </Box>
      </Box>


      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          bgcolor: 'rgba(120, 134, 107, 0.8)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
            {product.title}
          </Typography>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Arial, sans-serif', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.description}
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                  <b>Color:</b> {product.color}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                  <b>Gender:</b> {product.gender}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                  <b>Price:</b> ${product.price}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" sx={{ color: 'white', fontFamily: 'Arial, sans-serif' }}>
                  <b>Casepack:</b> {product.casepack}
                </Typography>
              </Grid>
            </Grid>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', padding: 0, paddingBottom: 1 }}>
          {token && isAdmin ? (
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" onClick={() => handleUpdate(product._id)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(product._id)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold', marginBottom: 1 }}>
                On-hand Qty: {product.stock}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, padding: '4px 8px' }}>
                <Typography variant="body2" sx={{ color: 'white', marginRight: 1 }}>
                  Qty:
                </Typography>
                <TextField
                  inputRef={amountInputRef}
                  value={quantity}
                  onChange={handleQuantityChange}
                  sx={{ width: 70, bgcolor: 'white', borderRadius: 1, borderColor: quantity !== "" && parseInt(quantity, 10) > product.stock ? 'red' : 'white' }}
                  type="number"
                  inputProps={{ min: 1, max: product.stock, step: 1 }}
                  size="small"
                  variant="outlined"
                  error={quantity !== "" && parseInt(quantity, 10) > product.stock}
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#ddd',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={handleAddToCart}
                disabled={quantity === "" || parseInt(quantity, 10) > product.stock}
              >
                <ShoppingCartCheckoutIcon sx={{ marginRight: 1 }} />
                Add
              </Button>
            </Stack>
          )}
        </CardActions>
        {warningMessage && (
          <Box sx={{ padding: 2 }}>
            <Alert severity="warning">{warningMessage}</Alert>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ProductCard;
