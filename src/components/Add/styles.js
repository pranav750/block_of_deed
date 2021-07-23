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

  title: {
    fontWeight: "700",
  },

  extraMargin: {
    margin: "10px",
  },
}));

export default useStyles;
