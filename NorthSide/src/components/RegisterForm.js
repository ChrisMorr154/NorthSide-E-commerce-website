import React, { useState } from "react";
import { Paper, TextField, Grid, Button, Box, Typography } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
  const authContext = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = async () => {
    console.log(userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          data: userData,
        }
      );
      console.log(response);
      if (response) {
        if (Object.keys(props)[0] !== "closeForm") {
          authContext.login(
            response.data.token,
            response.data.id,
            response.data.isAdmin
          );
          if (response.data.isAdmin === true) {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        } else {
          authContext.login(
            response.data.token,
            response.data.id,
            response.data.isAdmin
          );
          props.closeForm();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleIsAdmin = (e) => {
    console.log(e.target.value);
    console.log(checked);
    setChecked(!checked);
  };

  return (
    <React.Fragment>
      <Box sx={{ backgroundColor: "#78866B", minHeight: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            width: { xs: '90%', sm: 400 },
            padding: 4,
            margin: 'auto',
            backgroundColor: "#ffffff"  // White background color for the paper
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h4" component="h1" gutterBottom>
                Register
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                name="username"
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="E-mail"
                variant="outlined"
                type="text"
                name="email"
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                onChange={handleInputChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item>
              <Box
                textAlign="center"
                justifyContent="center"
                sx={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <Button 
                  variant="contained" 
                  sx={{ 
                    backgroundColor: "#000000", 
                    color: "white", 
                    '&:hover': {
                      backgroundColor: "#333333",
                    },
                    fullWidth: true
                  }} 
                  onClick={handleRegister}
                >
                  Register
                </Button>
                {Object.keys(props)[0] !== "closeForm" && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#555555",
                      color: "white",
                      '&:hover': {
                        backgroundColor: "#333333",
                      },
                    }}
                    onClick={props.showSignup}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default RegisterForm;
