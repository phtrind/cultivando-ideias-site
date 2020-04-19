import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    link: {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  })
);

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body2" color="secondary">
        Developed by{" "}
        <a
          className={classes.link}
          href="https://github.com/phtrind"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedro Trindade
        </a>
      </Typography>
    </div>
  );
}
