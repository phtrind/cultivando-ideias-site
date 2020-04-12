import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      whiteSpace: "pre-wrap",
    },
  })
);

type SnackbarProps = {
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
  message: string;
  onClose: () => void;
};

const SnackBar: FunctionComponent<SnackbarProps> = ({
  open,
  severity,
  message,
  onClose,
}) => {
  const classes = useStyles();
  return (
    <Snackbar
      className={classes.root}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
