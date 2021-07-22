import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: "black",
  },

  toolbar: {
    margin: "0 40px",
  },

  desktop: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  mobile: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },

  extraMargin: {
    margin: "10px",
  },
}));

export default useStyles;
