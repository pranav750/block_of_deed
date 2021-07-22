import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "30%",
    margin: "30px auto",
    padding: "30px",
    textAlign: "center",
  },

  title: {
    fontWeight: "700",
  },

  extraPadding: {
    padding: "10px",
  },
}));

export default useStyles;
