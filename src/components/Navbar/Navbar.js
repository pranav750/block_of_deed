import { Fragment, useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const [address, setAddress] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);

  useEffect(() => {
    const locationArray = location.pathname.split("/");
    for (let i = 0; i < locationArray.length; i++) {
      if (locationArray[i].length > 30) {
        setAddress(locationArray[i]);
        break;
      }
    }
  }, [location]);

  if (location.pathname === "/") return <div></div>;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileView = (
    <Menu keepMounted anchorEl={anchorEl} open={anchorEl} onClose={handleClose}>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="inherit"
        component={Link}
        to={`/admin/${address}`}
      >
        Home
      </MenuItem>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="inherit"
        component={Link}
        to={`/admin/add/admin/${address}`}
      >
        Add Admin
      </MenuItem>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="inherit"
        component={Link}
        to={`/admin/add/owner/${address}`}
      >
        Add Owner
      </MenuItem>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="inherit"
        component={Link}
        to={`/admin/add/property/${address}`}
      >
        Add Property
      </MenuItem>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="inherit"
        component={Link}
        to={`/admin/update/property/${address}`}
      >
        Update Property
      </MenuItem>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="inherit"
        component={Link}
        to={`/admin/owner/properties/${address}`}
      >
        Get Properties
      </MenuItem>
      <MenuItem
        className={classes.extraMargin}
        onClick={handleClose}
        color="secondary"
        component={Link}
        to="/"
      >
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Fragment>
      <AppBar className={classes.root} position="static" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography style={{ fontWeight: "500", flexGrow: "1" }} variant="h6">
            Block of Deeds
          </Typography>
          <Grid className={classes.mobile}>
            <Button
              className={classes.extraMargin}
              color="inherit"
              component={Link}
              to={`/admin/${address}`}
            >
              Home
            </Button>
            <Button
              className={classes.extraMargin}
              color="inherit"
              component={Link}
              to={`/admin/add/admin/${address}`}
            >
              Add Admin
            </Button>
            <Button
              className={classes.extraMargin}
              color="inherit"
              component={Link}
              to={`/admin/add/owner/${address}`}
            >
              Add Owner
            </Button>
            <Button
              className={classes.extraMargin}
              color="inherit"
              component={Link}
              to={`/admin/add/property/${address}`}
            >
              Add Property
            </Button>
            <Button
              className={classes.extraMargin}
              color="inherit"
              component={Link}
              to={`/admin/update/property/${address}`}
            >
              Update Property
            </Button>
            <Button
              className={classes.extraMargin}
              color="inherit"
              component={Link}
              to={`/admin/owner/properties/${address}`}
            >
              Get Properties
            </Button>
            <Button
              className={classes.extraMargin}
              color="secondary"
              component={Link}
              to="/"
            >
              Logout
            </Button>
          </Grid>
          <IconButton
            className={classes.desktop}
            color="inherit"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {mobileView}
    </Fragment>
  );
};

export default Navbar;
