import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get/${id}`);
      console.log(response.data);
      setProductData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/update/${id}`, productData);
      if (response.data === "Product updated successfully!") {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Grid container alignContent="center" justifyContent="center" style={{ paddingTop: "50px" }}>
        <Paper elevation={3} style={{ width: 550 }}>
          <Grid container direction="column" alignItems="center" gap={3}>
            <br />
            <Grid item>
              <Typography variant="h5">Update Product</Typography>
            </Grid>
            <Grid item>
              <Grid container direction="row" gap={3}>
                <Grid item>
                  <Grid container direction="column" gap={2}>
                    <TextField
                      label="Title"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.title || ""}
                      name="title"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Brand"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.brand || ""}
                      name="brand"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Category"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.category || ""}
                      name="category"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Description"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.description || ""}
                      name="description"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Gender"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.gender || ""}
                      name="gender"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Price"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      value={productData.price || ""}
                      name="price"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Discount Percentage"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      value={productData.discountPercentage || ""}
                      name="discountPercentage"
                      onChange={handleInputChanges}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container direction="column" gap={2}>
                    <TextField
                      label="Image link"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.images || ""}
                      name="images"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Stock"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      value={productData.stock || ""}
                      name="stock"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Thumbnail"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.thumbnail || ""}
                      name="thumbnail"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="UPC"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      value={productData.UPC || ""}
                      name="UPC"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="casepack"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      value={productData.casepack || ""}
                      name="casepack"
                      onChange={handleInputChanges}
                    />
                    <TextField
                      label="Color"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      value={productData.color || ""}
                      name="color"
                      onChange={handleInputChanges}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default UpdateProduct;
