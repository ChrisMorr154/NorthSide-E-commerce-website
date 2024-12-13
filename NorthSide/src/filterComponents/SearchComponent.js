import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = (props) => {
  const getSearchQuery = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      sx={{
        m: 1,
        minWidth: 300,
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#ced4da",
          },
          "&:hover fieldset": {
            borderColor: "#6c757d",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#495057",
          },
        },
      }}
      size="medium"
      onChange={getSearchQuery}
      value={props.searchValue || ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;
