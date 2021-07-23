import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "40%",
    margin: "30px auto",
    padding: "30px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
  },

  showCard: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    margin: "50px",
    [theme.breakpoints.down("md")]: {
      margin: "0",
    },
  },

  card: {
    width: "400px",
    padding: "30px",
    margin: "50px",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "700px",
    },
  },

  title: {
    fontWeight: "700",
  },

  extraPadding: {
    padding: "10px",
  },

  extraMargin: {
    margin: "10px",
  },
}));

export default useStyles;
