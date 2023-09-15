import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { Button, TextField, Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import MenuItem from "@mui/material/MenuItem";

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
    value: "Refunded",
    label: "Refunded",
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

const Simplebet = ({ setBet, id, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [error, setError] = useState("");

  const validationSchema = yup.object({
    name: yup
      .string("Enter your Bet Name")
      .min(2, "Bet Name should be of minimum 2 characters length")
      .max(30, "The Bet name must have a maximum length of 30 characters.")
      .required("Bet name is required"),
    amount: yup.string("Enter your amount").required("Amount is required!"),
    bookmarker: yup
      .string("Enter your bookmarker")
      .min(2, "Bookmarker should be of minimum 2 characters length")
      .max(30, "Bookmarker name must have a maximum length of 30 characters.")
      .required("Bookmarker is required"),
    sport: yup
    .string("Enter your sport")
    .required("Please enter the sport"),
    odd: yup
      .string("Enter the odd")
      .required("Please enter your odd"),
    state: yup
      .string("Select your state")
      .required("Please select the state of your bet"),
  });

  const formik = useFormik({
    initialValues: {
      id_bankroll: id,
      type: "simple",
      name: "",
      amount: "",
      bookmarker: "",
      sport: "",
      date: new Date().toDateString(),
      odd: "",
      state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values.id_bankroll);
      try {
        await axios.post("/bet/add", values)
        console.log("Bet has been created");
      } catch (err) {
        setError(err.response.data)
        console.log(error)
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
      m="100px 0px 100px 0px"
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
          New Simple Bet
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Bet"
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
            label="Amount"
            type="number"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            id="bookmarker"
            name="bookmarker"
            label="Bookmarker"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bookmarker && Boolean(formik.errors.bookmarker)}
            helperText={formik.touched.bookmarker && formik.errors.bookmarker}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            id="sport"
            name="sport"
            label="Sport"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.sport && Boolean(formik.errors.sport)}
            helperText={formik.touched.sport && formik.errors.sport}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            fullWidth
            id="odd"
            name="odd"
            label="Odds"
            type="number"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.odd && Boolean(formik.errors.odd)}
            helperText={formik.touched.odd && formik.errors.odd}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            id="select-state"
            select
            name="state"
            defaultValue="Won"
            label="Select the state"
            value={formik.values.currency}
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

export default Simplebet;
