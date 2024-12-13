import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "./actions/customerActions";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Card,
  Stack,
  Avatar,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const InfoForm = () => {
  const dispatch = useDispatch();
  const { customers, loading, error } = useSelector((state) => state.customer);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [shipTo, setShipTo] = useState("");
  const [shipToInfo, setShipToInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleCustomerChange = (event) => {
    const customer = customers.find((c) => c.custName === event.target.value);
    setSelectedCustomer(customer);
    setShipTo("");
    setShipToInfo(null);
  };

  const handleShipToChange = (event) => {
    setShipTo(event.target.value);
    const address = selectedCustomer.shippingAddresses.find((address) => address.shipName === event.target.value);
    setShipToInfo(address);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Customer Information
        </Typography>
        {loading && <p>Loading customers...</p>}
        {error && <p>Error loading customers: {error}</p>}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <Box p={2}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="customer-label">Customer Name</InputLabel>
                  <Select
                    labelId="customer-label"
                    value={selectedCustomer ? selectedCustomer.custName : ""}
                    onChange={handleCustomerChange}
                  >
                    <MenuItem value="">
                      <em>Select a customer</em>
                    </MenuItem>
                    {customers.map((customer) => (
                      <MenuItem key={customer._id} value={customer.custName}>
                        {customer.custName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedCustomer && (
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="shipTo-label">Ship To Name</InputLabel>
                    <Select labelId="shipTo-label" value={shipTo} onChange={handleShipToChange}>
                      <MenuItem value="">
                        <em>Select a ship to name</em>
                      </MenuItem>
                      {selectedCustomer.shippingAddresses.map((address) => (
                        <MenuItem key={address._id} value={address.shipName}>
                          {address.shipName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
                {shipToInfo && (
                  <Box mt={4}>
                    <Typography variant="h6" gutterBottom>
                      Shipping Information
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell>Value</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{shipToInfo.shipName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>{shipToInfo.shipAddress}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>City</TableCell>
                            <TableCell>{shipToInfo.shipCity}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>State</TableCell>
                            <TableCell>{shipToInfo.shipState}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Zip</TableCell>
                            <TableCell>{shipToInfo.shipZip}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default InfoForm;
