import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Button, TextField, Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { useLocation } from "react-router-dom";

const validationSchema = yup.object({
  name: yup
    .string("Enter your Bankroll Name")
    .min(2, "Name should be of minimum 2 characters length")
    .max(30, "The Bankroll name must have a maximum length of 30 characters.")
    .required("Bankroll name is required"),
  capital: yup.string("Enter your capital").required("Capital is required!"),
});

const EditBankroll = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const propsData = location.state;
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: propsData.name,
      capital: propsData.capital,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await axios.put(`/bankroll/${propsData.id}`, values);
        navigate(`/bankroll`);
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
          Edit your Bankroll
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
            value={formik.values.capital}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.capital && Boolean(formik.errors.capital)}
            helperText={formik.touched.capital && formik.errors.capital}
            sx={{ marginBottom: "20px" }}
          />
          <Button color="secondary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditBankroll;
