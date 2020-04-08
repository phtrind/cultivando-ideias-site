import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import NavigationItem from "./NavigationItem";
import ButtonListItem from "../../models/ButtonListItem";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginLeft: 0,
      padding: 0,
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      height: "100%",
      flexFlow: "column",
      listStyleType: "none",
      "@media (min-width: 500px)": {
        flexFlow: "row",
      },
    },
    title: {
      flexGrow: 1,
    },
  })
);

type NavigationItemsProps = {
  buttonList: ButtonListItem[];
};

const NavigationItems: FunctionComponent<NavigationItemsProps> = ({
  buttonList,
}) => {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {buttonList.map((x) => (
        <NavigationItem item={x} key={x.text} />
      ))}
    </ul>
  );
};

export default NavigationItems;
