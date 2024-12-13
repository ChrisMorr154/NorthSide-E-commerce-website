import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const genders = [
  { value: "all", label: "All" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const GenderComponent = ({ onChange, genderValue }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
      <InputLabel id="select-gender-label">Gender</InputLabel>
      <Select
        labelId="select-gender-label"
        id="select-gender"
        value={genderValue || ""}
        label="Gender"
        onChange={handleChange}
      >
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenderComponent;
