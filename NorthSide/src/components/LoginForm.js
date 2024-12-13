import React, { useState } from "react";
import { Paper, TextField, Grid, Button, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
console.log()
const LoginForm = (props) => {
  const navigate = useNavigate();
  const authContext = React.useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log(loginData);

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        data: loginData,
      });
      console.log(response.data);
      if (response) {
        if (Object.keys(props)[0] !== "closeForm") {
          console.log(response.data);
          authContext.login(
            response.data.token,
            response.data.userId,
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
            response.data.userId,
            response.data.isAdmin
          );
          props.closeForm();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    // Style the Form 
    <React.Fragment>
      <Box sx={{ backgroundColor: "#78866B", minHeight: "100vh", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            width: { xs: '90%', sm: 400 },
            padding: 4,
            margin: 'auto',
            backgroundColor: "#ffffff"
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
                Login
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                label="E-mail"
                variant="outlined"
                type="email"
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
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
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
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                {Object.keys(props)[0] !== "closeForm" && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Don't have an account?{" "}
                    <Link href="#" onClick={props.showSignup} sx={{ color: "black" }}>
                      Sign up
                    </Link>
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
