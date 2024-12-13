import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Button, Box, Toolbar, Typography, Paper } from "@mui/material";

import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import Pagination from "@mui/material/Pagination";
import SearchComponent from "../filterComponents/SearchComponent";
import CategoryComponent from "../filterComponents/CategoryComponent";
import "../App.css"; // Ensure this path is correct

const pageSize = 12;

const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("all");
  const [pagination, setPagination] = useState({
    count: 100,
    from: 0,
    to: pageSize,
  });

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
      setOriginalData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = (value) => {
    if (value === "") {
      setSearchValue("");
      setProductList(originalData);
    } else {
      setSearchValue(value);
      setProductList(
        originalData.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleCatChange = (value) => {
    setCategory(value);
    const catList = originalData.filter((item) => item.category === value);
    if (value === "all") {
      setProductList(originalData);
    } else {
      setProductList(catList);
    }
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setCategory("all");
    setProductList(originalData);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Box className="home-background">
        <Box className="home-content">
          <Toolbar
            component={Paper}
            elevation={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
              padding: 2,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <SearchComponent
                onChange={handleSearch}
                searchValue={searchValue}
              />
              <CategoryComponent
                onChange={handleCatChange}
                categoryValue={category}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleClearFilters}
              sx={{
                height: "fit-content",
                backgroundColor: "#555555",
                color: "white",
                "&:hover": {
                  backgroundColor: "#333333",
                },
              }}
            >
              Reset
            </Button>
          </Toolbar>
          <Grid container spacing={3} justifyContent="center">
            {productList.length !== 0 ? (
              productList
                .slice(pagination.from, pagination.to)
                .map((product) => (
                  <Grid item xs={12} key={product._id}>
                    <ProductCard
                      key={product._id}
                      product={product}
                      getProduct={getProduct}
                    />
                  </Grid>
                ))
            ) : (
              <Grid container direction="column" alignItems="center">
                <Typography variant="h6" color="textSecondary">
                  No Products Found
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
            <Pagination
              count={Math.ceil(pagination.count / pageSize)}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#555555",
                  border: "1px solid #555555",
                  borderRadius: "8px",
                  margin: "0 4px",
                },
                "& .Mui-selected": {
                  backgroundColor: "#555555 !important",
                  color: "#ffffff",
                  borderColor: "#555555",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "#eeeeee",
                },
              }}
              onChange={(e, value) => handlePagination(e, value)}
            />
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HomePage;
