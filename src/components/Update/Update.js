import {
  Button,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import ClearIcon from "@material-ui/icons/Clear";
import main from "../../ethereum/main";
import web3 from "../../ethereum/web3";
import deployInstance from "../../ethereum/owner";
import useStyles from "./styles";

const Update = () => {
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loan, setLoan] = useState("");
  const [name, setName] = useState("");
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    propertyNumber: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const isOwner = await main.methods
        .checkOwner(form.fullName, form.address)
        .call();

      if (!isOwner) throw "Owner not defined";

      const owner = deployInstance(form.address);

      const property = await owner.methods
        .properties(form.propertyNumber - 1)
        .call();

      properties.push({
        location: property.location,
        state: property.state,
        area: property.area,
        city: property.city,
        country: property.country,
        loanCompleted: property.loanCompleted,
        loanOngoing: property.loanCompleted,
        owned: property.owned,
      });
      setName(form.fullName);
      setProperties(properties);
    } catch (error) {
      setMessage("Cannot get properties");
    }

    setAddress("");
    setFullName("");
    setIsLoading(false);
  };

  const action = (
    <Button
      style={{ color: "white" }}
      onClick={() => {
        setMessage("");
      }}
    >
      <ClearIcon />
    </Button>
  );

  return (
    <Fragment>
      <Paper className={classes.root} elevation={3}>
        <Typography className={classes.title} variant="h6" gutterBottom>
          Get User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.extraMargin}
            label="Full Name"
            onChange={(event) =>
              setForm((prevState) => ({
                ...prevState,
                fullName: event.target.value,
              }))
            }
            value={form.fullName}
            fullWidth
          />
          <TextField
            className={classes.extraMargin}
            label="Address"
            onChange={(event) =>
              setForm((prevState) => ({
                ...prevState,
                address: event.target.value,
              }))
            }
            value={form.address}
            fullWidth
          />
          <TextField
            className={classes.extraMargin}
            label="Property Number"
            type="number"
            onChange={(event) =>
              setForm((prevState) => ({
                ...prevState,
                propertyNumber: event.target.value,
              }))
            }
            value={form.propertyNumber}
            fullWidth
          />
          {isLoading ? (
            <CircularProgress className={classes.extraMargin} />
          ) : (
            <Button
              className={classes.extraMargin}
              type="submit"
              variant="outlined"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          )}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={message !== "" ? true : false}
            message={message}
            action={action}
          />
        </form>
      </Paper>
      <div className={classes.showCard}>
        {properties.map((property, index) => (
          <Card className={classes.card} elevation={3}>
            <img width="50%" src={house} alt="Admin" />
            <CardActionArea className={classes.extraPadding}>
              <CardContent>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  Property: {index + 1}
                </Typography>
                <Typography variant="body1" component="p">
                  Location - {property.location}
                </Typography>
                <Typography variant="body1" component="p">
                  City - {property.city}
                </Typography>
                <Typography variant="body1" component="p">
                  State - {property.state}
                </Typography>
                <Typography variant="body1" component="p">
                  Country - {property.country}
                </Typography>
                <Typography variant="body1" component="p">
                  Area - {property.area} square feet
                </Typography>
                <form>
                  <FormLabel component="legend">Loan</FormLabel>
                  <RadioGroup
                    name="loan"
                    value={loan}
                    onChange={(event) => setLoan(event.target.value)}
                  >
                    <FormControlLabel
                      value="Ongoing"
                      control={<Radio />}
                      label="Ongoing"
                    />
                    <FormControlLabel
                      value="Completed"
                      control={<Radio />}
                      label="Completed"
                    />
                  </RadioGroup>
                </form>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default Update;
