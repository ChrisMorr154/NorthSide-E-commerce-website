import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import {
  Typography,
  Grid,
  Stack,
  Divider,
  Chip,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  CardHeader,
  Avatar,
} from "@mui/material";
import Card from "@mui/material/Card";
import FilterListIcon from "@mui/icons-material/FilterList";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get("http://localhost:5000/order/" + userId);
      setOrders(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const toggleSortOrder = () => {
    if (isAscending) {
      sortByDateDESC();
    } else {
      sortByDateASC();
    }
    setIsAscending(!isAscending);
  };

  const sortByDateASC = () => {
    let arrayForSort = [...orders];
    const ascArray = arrayForSort.sort((a, b) => {
      const date1 = new Date(a.createdDate);
      const date2 = new Date(b.createdDate);
      return date1 - date2;
    });
    setOrders(ascArray);
  };

  const sortByDateDESC = () => {
    let arrayForSort = [...orders];
    const descArray = arrayForSort.sort((a, b) => {
      const date1 = new Date(a.createdDate);
      const date2 = new Date(b.createdDate);
      return date2 - date1;
    });
    setOrders(descArray);
  };

  return (
    <React.Fragment>
      <NavBar />
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingTop: 2, paddingX: isSmallScreen ? 2 : 8 }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Order History</Typography>
        <Stack direction="row" gap={2}>
          <Tooltip title={isAscending ? "Sort Descending" : "Sort Ascending"}>
            <Button
              variant="contained"
              onClick={toggleSortOrder}
              startIcon={<FilterListIcon />}
              endIcon={isAscending ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              sx={{ backgroundColor: 'black', color: 'white' }}
            >
              Sort Date
            </Button>
          </Tooltip>
        </Stack>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        gap={2}
        sx={{ paddingTop: 5, paddingX: isSmallScreen ? 2 : 8 }}
      >
        {orders !== undefined &&
          orders.map((Orderitem) => (
            <Grid item xs={12} sm={12} md={10} lg={8} key={Orderitem.id}>
              <Card sx={{ height: 'auto', width: '100%', borderRadius: 2 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'black' }}>
                      <PersonIcon />
                    </Avatar>
                  }
                  title={`Order #${Orderitem.id}`}
                  subheader={`Placed on ${new Date(Orderitem.createdDate).toLocaleDateString()}`}
                />
                <CardContent>
                  <Stack direction="column" gap={2}>
                    <Box>
                    <Typography>PO: {Orderitem.POnumber}</Typography>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Customer Information
                      </Typography>
                      <Typography>Customer: {Orderitem.customerName}</Typography>
                      <Typography>Ship To: {Orderitem.shiptoName}</Typography>
                    </Box>
                    <Divider />
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Shipping Address
                      </Typography>
                      <Typography>Address: {Orderitem.address}</Typography>
                      <Typography>City: {Orderitem.city}</Typography>
                      <Typography>State: {Orderitem.state} {Orderitem.zipCode}</Typography>
                      <Typography>Country: {Orderitem.country}</Typography>
                    </Box>
                    <Divider sx={{ marginY: 2 }} />
                    <Chip label="Order Details" sx={{ alignSelf: 'center', marginY: 1 }} />
                    <TableContainer
                      component={Paper}
                      sx={{
                        overflow: "auto",
                        maxHeight: 400,
                        marginTop: 2,
                      }}
                    >
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {JSON.parse(Orderitem.items).map((item) => (
                            <TableRow
                              key={item.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {item.title}
                              </TableCell>
                              <TableCell>${item.price}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>
                                ${item.price * item.quantity}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default OrdersPage;
