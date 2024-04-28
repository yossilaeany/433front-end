import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { doApiMethod, API_URL, TOKEN_KEY } from '../servises/apiServices'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

const defaultTheme = createTheme();

const SignIn = () => {

 // controll the form 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

// play the API request function when submit the form
  const onSub = (bodyData) => {
    console.log(bodyData);
    doApiPost(bodyData);
  };

  // get props {_url - from .env, _method - post/get, _body - the obj to send }
  const doApiPost = async (bodyData) => {
    const url = API_URL + "users/logIn";
    try {
      const data = await doApiMethod(url, "POST", bodyData);
      // Check if resp.data exists before accessing its properties
      if (data) {
        if (data.role === "admin") {
          localStorage.setItem(TOKEN_KEY, data.token);
          console.log(data);
          navigate('/home');
        }
      } else {
        // Handle the case where the response doesn't contain expected data
        alert("Invalid response from server");
      }
    } catch (error) {
      alert("Password or email is wrong");
      console.log(error);
    }
  };
  const navigate = useNavigate()
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSub)}>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <div className="text-danger">* Enter valid email</div>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', { required: true, minLength: 3 })}
              />
              {errors.password && (
                <div className="text-danger">
                  * Enter valid password (min 4 chars)
                </div>
              )}
              {/*
            not used for now
             <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;