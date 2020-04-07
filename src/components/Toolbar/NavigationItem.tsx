import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonListItem from "../../models/ButtonListItem";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 10,
      display: "flex",
      height: "100%",
      width: "auto",
      alignItems: "center",
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function NavigationItem(item: ButtonListItem) {
  const classes = useStyles();

  return (
    <li className={classes.root} key={item.text}>
      <Button onClick={item.click}>{item.text}</Button>
    </li>
  );
}
