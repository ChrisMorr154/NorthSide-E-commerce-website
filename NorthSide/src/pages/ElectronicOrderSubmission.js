import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import NavBar from "../components/NavBar"; // Import the NavBar component
import "../App.css"; // Ensure this import path is correct

const ElectronicOrderSubmission = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`http://localhost:5000/order/${userId}`);
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const downloadXML = async (POnumber) => {
    try {
      const response = await axios.get(`http://localhost:5000/order/xml/${POnumber}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${POnumber}.xml`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading XML:", error);
    }
  };

  return (
    <React.Fragment>
      <NavBar /> {/* Include the NavBar */}
      <Box className="home-background">
        <Box className="home-content">
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            Electronic Order Submission
          </Typography>
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {orders.map((order) => (
                <Grid item xs={12} sm={6} md={4} key={order.POnumber}>
                  <Paper sx={{ padding: 2, borderRadius: 2 }}>
                    <Typography variant="h6">Order #{order.POnumber}</Typography>
                    <Typography>Customer: {order.customerName}</Typography>
                    <Typography>Ship To: {order.shiptoName}</Typography>
                    <Typography>Total Amount: ${order.totalAmount}</Typography>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadXML(order.POnumber)}
                      sx={{ marginTop: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'gray' } }}
                    >
                      Download XML
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ElectronicOrderSubmission;
