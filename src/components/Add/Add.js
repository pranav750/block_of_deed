import {
  Button,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router";
import ClearIcon from "@material-ui/icons/Clear";
import main from "../../ethereum/main";
import web3 from "../../ethereum/web3";
import deployInstance from "../../ethereum/owner";
import useStyles from "./styles";

const Add = ({ user }) => {
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
  const [form, setForm] = useState({
    address: "",
    location: "",
    city: "",
    state: "",
    country: "",
    area: 0,
    loanOnGoing: true,
    loanCompleted: false,
    owned: true,
  });

  useEffect(() => {
    setForm({
      address: "",
      location: "",
      city: "",
      state: "",
      country: "",
      area: 0,
      loanOngoing: true,
      loanCompleted: false,
      owned: true,
    });
    setFullName("");
    setIsLoading(false);
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (user === "admin") {
      try {
        const accounts = await web3.eth.getAccounts();

        await main.methods.createAdmin(fullName).send({
          from: accounts[0],
        });

        const adminAddress = await main.methods.admins(fullName).call();
        setMessage(`Please copy ${adminAddress} and use it to login`);
      } catch (error) {
        setMessage("Couldn't make an instance of Admin Contract");
      }
    } else if (user === "owner") {
      try {
        const accounts = await web3.eth.getAccounts();

        await main.methods.createOwner(fullName).send({
          from: accounts[0],
        });

        const ownerAddress = await main.methods.owners(fullName).call();
        setMessage(`Please copy ${ownerAddress} and use it to login`);
      } catch (error) {
        setMessage("Couldn't make an instance of Owner Contract");
      }
    } else if (user === "property") {
      try {
        const accounts = await web3.eth.getAccounts();

        const isOwner = await main.methods
          .checkOwner(fullName, form.address)
          .call();

        console.log(isOwner);
        if (!isOwner) throw "Owner not Identified";

        const owner = deployInstance(form.address);

        await owner.methods
          .addProperty(
            form.location,
            form.city,
            form.state,
            form.country,
            form.area,
            form.loanOngoing,
            form.loanCompleted
          )
          .send({
            from: accounts[0],
          });

        setMessage("Property successfully added");
      } catch (error) {
        setMessage("Property was not added");
      }
    }

    setForm({
      address: "",
      location: "",
      city: "",
      state: "",
      country: "",
      area: 0,
      loanOngoing: true,
      loanCompleted: false,
      owned: true,
    });
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
    <Paper className={classes.root} elevation={3}>
      <Typography className={classes.title} variant="h6" gutterBottom>
        {user === "admin" && "Add Admin"} {user === "owner" && "Add Owner"}{" "}
        {user === "property" && "Add Property"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.extraMargin}
          label="Full Name"
          type="text"
          onChange={(event) => setFullName(event.target.value)}
          value={fullName}
          fullWidth
        />
        {user === "property" && (
          <Fragment>
            <TextField
              className={classes.extraMargin}
              label="Owner Secret Address"
              type="text"
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
              label="Location"
              type="text"
              onChange={(event) =>
                setForm((prevState) => ({
                  ...prevState,
                  location: event.target.value,
                }))
              }
              value={form.location}
              fullWidth
            />
            <TextField
              className={classes.extraMargin}
              label="City"
              type="text"
              onChange={(event) =>
                setForm((prevState) => ({
                  ...prevState,
                  city: event.target.value,
                }))
              }
              value={form.city}
              fullWidth
            />
            <TextField
              className={classes.extraMargin}
              label="State"
              type="text"
              onChange={(event) =>
                setForm((prevState) => ({
                  ...prevState,
                  state: event.target.value,
                }))
              }
              value={form.state}
              fullWidth
            />
            <TextField
              className={classes.extraMargin}
              label="Country"
              type="text"
              onChange={(event) =>
                setForm((prevState) => ({
                  ...prevState,
                  country: event.target.value,
                }))
              }
              value={form.country}
              fullWidth
            />
            <TextField
              className={classes.extraMargin}
              label="Area"
              type="number"
              onChange={(event) =>
                setForm((prevState) => ({
                  ...prevState,
                  area: event.target.value,
                }))
              }
              value={form.area}
              fullWidth
            />
          </Fragment>
        )}

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
  );
};

export default Add;
