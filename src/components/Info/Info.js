import { useState, useEffect } from "react";
import {
  CardActionArea,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import admin from "../../images/admin.jpg";
import { useParams } from "react-router";
import deployInstance from "../../ethereum/admin";

const Info = () => {
  const classes = useStyles();
  const params = useParams();
  const [userData, setUserData] = useState({
    fullName: "",
    address: "",
  });

  useEffect(() => {
    const getAdminData = async () => {
      const admin = deployInstance(params.address);
      const adminName = await admin.methods.name().call();
      setUserData({
        fullName: adminName,
        address: params.address,
      });
    };

    getAdminData();
  }, [params]);

  return (
    <Card className={classes.root} elevation={3}>
      <CardActionArea className={classes.extraPadding}>
        <img width="50%" src={admin} alt="Admin" />
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            Welcome {userData.fullName}
          </Typography>
          <Typography variant="body1" component="p">
            The smart contract of {userData.fullName} is stored at address
          </Typography>
          <Typography variant="body1" component="p" noWrap>
            {userData.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Info;
