import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const categories = [
    { value: "all", label: "All" },
    { value: "Hiking Boots", label: "Hiking" },
    { value: "Hunting", label: "Hunting" },
  ];

const CategoryComponent = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
      <InputLabel id="demo-select-small">Categories</InputLabel>
      <Select
        labelId="select-categories"
        id="select-categories"
        value={props.categoryValue || ""}
        label="Categories"
        onChange={handleChange}
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryComponent;