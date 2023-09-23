import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useFormik, FieldArray, Field } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Button, TextField, Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";


const states = [
  {
    value: "Won",
    label: "Won",
  },
  {
    value: "Lost",
    label: "Lost",
  },
  {
    value: "Cashout",
    label: "Cashout",
  },
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Canceled",
    label: "Canceled",
  },
];

const EditCombinedbet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const propsData = location.state;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: propsData.name,
      amount: propsData.capital,
      bookmarker: propsData.bookmarker,
      date: new Date().toDateString(),
      state: '',
      sport: propsData.sport,
      odd: propsData.odd
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {

      console.log(values);
      try {
        await axios.put(`/bet/${propsData.id}`, values)
        navigate("/bankroll");
      } catch (err) {
        setError(err.response.data)
        console.log(error)
      }
    },
  });


  return (
    <Box
      width="100%"
      height="100vh"
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
          <KeyboardReturnIcon onClick={() => setBet("")} />
        </Box>
        <Typography variant="h3" marginBottom="10px" textAlign="center">
          Edit Combined Bet
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            id="amount"
            name="amount"
            type="number"
            inputProps={{
              step: 0.01,
            }}
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // error={formik.touched.amount && Boolean(formik.errors.amount)}
            // helperText={formik.touched.amount && formik.errors.amount}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            id="bookmarker"
            name="bookmarker"
            value={formik.values.bookmarker}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bookmarker && Boolean(formik.errors.bookmarker)
            }
            helperText={formik.touched.bookmarker && formik.errors.bookmarker}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="select-state"
            select
            name="state"
            label="Select the state"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            sx={{ marginBottom: "20px", width: "100%" }}
          >
            {states.map((option) => (
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

export default EditCombinedbet;
