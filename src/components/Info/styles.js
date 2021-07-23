import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
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

  extraPadding: {
    padding: "10px",
  },
}));

export default useStyles;
