import { Typography } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useStyles from "./styles";

import family from "../../images/family.jpg";

import Enter from "../Enter/Enter";
import { Fragment } from "react";

const Home = () => {
  const classes = useStyles();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.rootContent}>
          <div className={classes.timepass}>
            <Typography className={classes.title} variant="h2" gutterBottom>
              Block of Deeds
            </Typography>
            <Typography className={classes.content} variant="h6">
              This web application is a prototype of how the real estate
              document digitalisation will take place in coming years. Instead
              of putting the data on database, here the data will go in{" "}
              <strong>Ethereum Blockchain</strong>. For testing, the data here
              will be stored in Rinkeby Test Network provided by Ethereum. Till
              now, 0 data entries are done.
            </Typography>
          </div>
        </div>

        <img
          style={{ margin: "0 auto" }}
          className={classes.rootImage}
          src={family}
          alt="family"
        ></img>
      </div>
      <Enter />
      <Alert
        style={{
          backgroundColor: "#ffb74d",
          margin: "40px auto",
          width: "300px",
          textAlign: "center",
        }}
        severity="warning"
      >
        Warning: MetaMask Account is mandatory
      </Alert>
    </Fragment>
  );
};

export default Home;
