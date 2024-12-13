import React, { useState, useEffect } from "react";
import { TextField, List, ListItem } from "@mui/material";

const CustomerSearch = ({ customers, onCustomerSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    setFilteredCustomers(
      customers.filter((customer) =>
        customer.custName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, customers]);

  const handleSelect = (customer) => {
    onCustomerSelect(customer);
    setSearchTerm(customer.custName);
  };

  return (
    <div>
      <TextField
        label="Search Customer"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
      {searchTerm && (
        <List>
          {filteredCustomers.map((customer) => (
            <ListItem button key={customer._id} onClick={() => handleSelect(customer)}>
              {customer.custName}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default CustomerSearch;
