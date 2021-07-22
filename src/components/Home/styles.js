import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "40px",
    height: "95vh",
  },

  rootContent: {
    flex: "2",
    margin: "auto",
  },

  rootImage: {
    flex: "3",
  },

  title: {
    fontWeight: "900",
  },

  content: {
    fontWeight: "400",
  },
}));

export default useStyles;
