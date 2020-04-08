import React, { FunctionComponent } from "react";
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

type NavigationItemProps = {
  item: ButtonListItem;
};

const NavigationItem: FunctionComponent<NavigationItemProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <li className={classes.root}>
      <Button onClick={item.click}>{item.text}</Button>
    </li>
  );
};

export default NavigationItem;
