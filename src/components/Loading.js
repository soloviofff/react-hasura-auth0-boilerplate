import React from "react";
import loading from "../assets/loading.svg";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spinner: {
    width: '100%',
    height: '100vh',
    display: 'flex'
  }
}));
const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <img src={loading} alt="Loading" />
    </div>
  )
};

export default Loading;
