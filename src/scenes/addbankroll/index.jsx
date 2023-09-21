import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Button, TextField, Box, useTheme, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { tokens } from "../../theme";
import MenuItem from "@mui/material/MenuItem";

const currencies = [
  {
    value: "USD",
    label: "USD",
  },
  {
    value: "EUR",
    label: "EUR",
  },
  {
    value: "COP",
    label: "COP",
  },
  {
    value: "ARS",
    label: "ARS",
  },
];

const odds = [
  {
    value: "Decimal",
    label: "Decimal",
  },
  {
    value: "American",
    label: "American",
  },
  {
    value: "Fractional",
    label: "Fractional",
  },
];

const validationSchema = yup.object({
  name: yup
    .string("Enter your Bankroll Name")
    .min(2, "Name should be of minimum 2 characters length")
    .max(30, "The Bankroll name must have a maximum length of 30 characters.")
    .required("Bankroll name is required"),
  capital: yup.string("Enter your capital").required("Capital is required!"),
  odd: yup.string("Select your odd").required("Please select your odd"),
  currency: yup
    .string("Select your currency")
    .required("Please select your currency"),
});

const Addbankroll = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      capital: "",
      odd: "",
      currency: "",
      id_user: currentUser?.id,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/bankroll/add", values);
        navigate("/bankroll");
      } catch (err) {
        setError(err.response.data);
        console.log(error);
      }
    },
  });

  return (
    <Box
      width="100%"
      height="70vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          backgroundColor: colors.primary[600],
          padding: "20px",
          borderRadius: "10px",
          width: "50%",
        }}
      >
        <Box display="flex" justifyContent="end">
          <KeyboardReturnIcon onClick={() => navigate("/bankroll")} />
        </Box>
        <Typography variant="h3" textAlign="center" marginBottom="10px">
          New Bankroll
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Bankroll Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            id="capital"
            name="capital"
            label="Capital"
            type="number"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.capital && Boolean(formik.errors.capital)}
            helperText={formik.touched.capital && formik.errors.capital}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="select-currency"
            select
            name="currency"
            defaultValue="USD"
            label="Select your currency"
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currency && Boolean(formik.errors.currency)}
            helperText={formik.touched.currency && formik.errors.currency}
            sx={{ marginBottom: "20px", width: "100%" }}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="select-odd"
            name="odd"
            select
            defaultValue="American"
            label="Select your odd"
            value={formik.values.odd}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.odd && Boolean(formik.errors.odd)}
            helperText={formik.touched.odd && formik.errors.odd}
            sx={{ marginBottom: "15px", width: "100%" }}
          >
            {odds.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button color="secondary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Addbankroll;
