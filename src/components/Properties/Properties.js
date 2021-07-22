import {
  Button,
  Paper,
  Typography,
  TextField,
  CircularProgress,
  Snackbar,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";
import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router";
import ClearIcon from "@material-ui/icons/Clear";
import main from "../../ethereum/main";
import useStyles from "./styles";
import deployInstance from "../../ethereum/owner";
import house from "../../images/house.gif";

const Properties = () => {
  const classes = useStyles();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    setMessage("");
    setAddress("");
    setFullName("");
    setName("");
    setProperties([]);
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const isOwner = await main.methods.checkOwner(fullName, address).call();

      if (!isOwner) throw "Owner not defined";

      const owner = deployInstance(address);

      const noOfProperties = await owner.methods
        .noOfPropertiesRegistered()
        .call();

      const properties = [];
      for (let i = 0; i < noOfProperties; i++) {
        const property = await owner.methods.properties(i).call();
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
      }
      setName(fullName);
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
          Get Properties
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.extraMargin}
            label="Full Name"
            onChange={(event) => setFullName(event.target.value)}
            value={fullName}
            fullWidth
          />
          <TextField
            className={classes.extraMargin}
            label="Address"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
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
                <Typography variant="body1" component="p">
                  Loan - {property.loanCompleted ? "Completed" : "Ongoing"}
                </Typography>
                <Typography variant="body1" component="p">
                  Status -{" "}
                  {property.owned
                    ? `Owned by ${name}`
                    : `Previously Owned by ${name}`}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </Fragment>
  );
};

export default Properties;
