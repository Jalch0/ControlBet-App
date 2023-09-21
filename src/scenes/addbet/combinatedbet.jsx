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

const Combinatedbet = ({ setBet, id, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      id_bankroll: id,
      type: "combined",
      name: "",
      amount: "",
      bookmarker: "",
      date: new Date().toDateString(),
      state: "",
      bet: [
        {
          sport: "",
          odd: "",
        },
      ],
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      const sport = [];
      let odd = 1;

      values.bet.map((i) => {
        sport.push(i.sport);
        odd = odd * parseFloat(i.odd);
      });
      
      inputs.name = values.name;
      inputs.amount = values.amount;
      inputs.bookmarker = values.bookmarker;
      inputs.state = values.state;
      inputs.sport = sport.toString();
      inputs.odd = odd;
      console.log(inputs);

      try {
        await axios.post("/bet/add", inputs)
        navigate("/bankroll")
      } catch (err) {
        setError(err.response.data)
        console.log(error)
      }

    },
  });

  const inputs = {
    id_bankroll: id,
    type: "combined",
    name: "",
    amount: "",
    bookmarker: "",
    date: new Date().toDateString(),
    state: "",
    sport: "",
    odd: "",
  }

  const [total, setTotal] = useState();

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
          New Combinated Bet
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
            inputProps={{
              step: 0.01,
            }}
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
            label="Bookmarker"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.bookmarker && Boolean(formik.errors.bookmarker)
            }
            helperText={formik.touched.bookmarker && formik.errors.bookmarker}
            sx={{ marginBottom: "20px" }}
          />

          {formik.values.bet.map((b, index) => {
            const Sport = `bet[${index}].sport`;
            const Odd = `bet[${index}].odd`;

            return (
              <Box key={index}>
                <Divider sx={{ marginBottom: "10px" }}>{index + 1} bet</Divider>
                <Box display="flex">
                  <TextField
                    sx={{ width: "100%" }}
                    id="sport"
                    name={Sport}
                    label="Sport"
                    value={b.sport}
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sport && Boolean(formik.errors.sport)}
                    helperText={formik.touched.sport && formik.errors.sport}
                  />
                  <TextField
                    sx={{ width: "100%" }}
                    id="odd"
                    name={Odd}
                    label="Odd"
                    value={b.odd}
                    type="number"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.odd && Boolean(formik.errors.odd)}
                    helperText={formik.touched.odd && formik.errors.odd}
                  />
                </Box>
                <Box display="flex" justifyContent="flex-end" m="15px 0  15px 0">
                  <Button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    onClick={() => {
                      formik.values.bet.pop(),
                        setTotal(formik.values.bet.length),
                        console.log(total);
                    }}
                  >
                    Delete Bet
                  </Button>
                </Box>
              </Box>
            );
          })}
          <Divider/>
          <Button
          sx={{margin: "10px 0 25px 0"}}
            type="button"
            variant="contained"
            onClick={() => {
              formik.values.bet.push({ sport: "", odd: "" }),
                setTotal(formik.values.bet.length),
                console.log(total);
            }}
          >
            Add a new bet
          </Button>

          <TextField
            id="select-state"
            select
            name="state"
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

export default Combinatedbet;
