import { useState, useContext } from 'react';
import { useNavigate  } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AuthContext } from '../../context/authContext';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      This website is developed by {" "}
      <Link color="inherit" href="https://github.com/Jalch0">
        Javier Labrador
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignIn() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
        username: data.get("username"),
        password: data.get("password")
    }
    try {
        await login(inputs);
        console.log("nice login")
        navigate("/")
    } catch (err) {
        setError(err.response.data);
    }
  };

  return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            padding: "25px",
            borderRadius: "5px",
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: colors.primary[400]
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {err && <Typography color={colors.redAccent[500]} sx={{fontWeight: "bold"}}>{err}</Typography>}
            <Grid container>
              <Grid item>
                <Link sx={{color: colors.grey[100]}} href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}