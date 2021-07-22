import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "40%",
    margin: "30px auto",
    padding: "30px",
    textAlign: "center",
  },

  showCard: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    margin: "50px",
  },

  card: {
    width: "400px",
    padding: "30px",
    margin: "50px",
    textAlign: "center",
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
