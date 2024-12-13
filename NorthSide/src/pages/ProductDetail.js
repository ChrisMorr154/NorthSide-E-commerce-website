import React, { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { addToCart } from "../store/cart/cartActions";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [casepacks, setCasepacks] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data);
        setCasepacks(response.data.casepacks || []);  // Ensure casepacks is an array
      } catch (e) {
        console.log(e);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = (casepack) => {
    const productItem = {
      product: product,
      casepack: casepack,
      amount: 1,
    };
    dispatch(addToCart(productItem));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Box sx={{ padding: 3 }}>
      <Button onClick={() => navigate("/")} variant="contained" sx={{ marginBottom: 3 }}>
        Back to Home
      </Button>
      <Typography variant="h4" sx={{ marginBottom: 3 }}>{product.title}</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Casepack</TableCell>
              <TableCell>On-hand Quantity</TableCell>
              <TableCell>UPC</TableCell>
              <TableCell>Add to Cart</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {casepacks.map((casepack, index) => (
              <TableRow key={index}>
                <TableCell>{casepack.casepack}</TableCell>
                <TableCell>{casepack.stock}</TableCell>
                <TableCell>{casepack.UPC}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToCart(casepack)}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductDetail;
