import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "40px",
    height: "95vh",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },

  rootContent: {
    flex: "2",
    margin: "auto",
    [theme.breakpoints.down("md")]: {
      flex: "1",
    },
  },

  timepass: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      margin: "0 auto",
    },
  },

  rootImage: {
    flex: "3",
    [theme.breakpoints.down("sm")]: {
      flex: "1",
      width: "100%",
    },
  },

  title: {
    fontWeight: "900",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "800",
      fontSize: "2rem",
    },
  },

  content: {
    fontWeight: "400",
    [theme.breakpoints.down("sm")]: {
      fontWeight: "300",
      fontSize: "1rem",
    },
  },
}));

export default useStyles;
