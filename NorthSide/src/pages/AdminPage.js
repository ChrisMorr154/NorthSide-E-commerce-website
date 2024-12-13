import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, Box, Toolbar, Paper } from "@mui/material";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";

const pageSize = 12;

const AdminPage = () => {
  const [productList, setProductList] = useState([]);
  const [pagination, setPagination] = useState({
    count: 100,
    from: 0,
    to: pageSize,
  });

  // Pagination
  const handlePagination = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from, to });
  };

  useEffect(() => {
    setPagination({ ...pagination, count: productList.length });
  }, [productList.length]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/product");
      setProductList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <Box sx={{ marginTop: 0.5, padding: 3, backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
        <Toolbar
          component={Paper}
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
            padding: 2,
            backgroundColor: "#ffffff",
            borderRadius: 1,
          }}
        >
          <Typography variant="h6">Admin Panel - Products</Typography>
        </Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="products">
              <Grid container spacing={3} justifyContent="center">
                {productList.length !== 0 ? (
                  productList
                    .slice(pagination.from, pagination.to)
                    .map((product) => (
                      <Grid item key={product._id}>
                        <ProductCard
                          key={product._id}
                          product={product}
                          getProduct={getProduct}
                        />
                      </Grid>
                    ))
                ) : (
                  <Grid container direction="column" alignItems="center">
                    <Typography variant="h6" color="textSecondary">No Products Found</Typography>
                  </Grid>
                )}
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          sx={{ marginTop: 4 }}
        >
          <Pagination
            count={Math.ceil(pagination.count / pageSize)}
            color="primary"
            onChange={(e, value) => handlePagination(e, value)}
          />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default AdminPage;
