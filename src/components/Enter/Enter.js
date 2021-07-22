import {
  Button,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import ClearIcon from "@material-ui/icons/Clear";
import main from "../../ethereum/main";
import web3 from "../../ethereum/web3";
import useStyles from "./styles";

const Enter = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [create, setCreate] = useState(true);
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    if (create) {
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
    } else {
      try {
        const isAdmin = await main.methods.checkAdmin(fullName, address).call();

        if (!isAdmin) throw "Admin not defined";

        history.push(`/admin/${address}`);
      } catch (error) {
        setMessage("Couldn't find the address of Admin Contract");
      }
    }

    setFullName("");
    setAddress("");
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
      {create ? (
        <Button
          className={classes.extraMargin}
          onClick={() => setCreate(false)}
        >
          Login
        </Button>
      ) : (
        <Button className={classes.extraMargin} onClick={() => setCreate(true)}>
          Create
        </Button>
      )}
      <Typography className={classes.title} variant="h6" gutterBottom>
        {create ? "Create Instance of Admin" : "Enter Address of Admin"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.extraMargin}
          label="Full Name"
          onChange={(event) => setFullName(event.target.value)}
          value={fullName}
          fullWidth
        />
        {!create && (
          <TextField
            className={classes.extraMargin}
            label="Address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
            fullWidth
          />
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

export default Enter;
