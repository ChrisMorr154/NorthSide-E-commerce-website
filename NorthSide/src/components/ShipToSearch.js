import React, { useState, useEffect } from "react";
import { TextField, List, ListItem } from "@mui/material";

const ShipToSearch = ({ shippingAddresses, onShipToSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  useEffect(() => {
    setFilteredAddresses(
      shippingAddresses.filter((address) =>
        address.shipName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, shippingAddresses]);

  const handleSelect = (address) => {
    onShipToSelect(address);
    setSearchTerm(address.shipName);
  };

  return (
    <div>
      <TextField
        label="Search Ship To"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
      {searchTerm && (
        <List>
          {filteredAddresses.map((address) => (
            <ListItem button key={address._id} onClick={() => handleSelect(address)}>
              {address.shipName}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default ShipToSearch;
