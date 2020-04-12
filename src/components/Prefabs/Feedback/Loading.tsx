import React, { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

type LoadingProps = {
  open: boolean;
};

const Loading: FunctionComponent<LoadingProps> = ({ open }) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.root} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
