import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ButtonListItem from "../../models/ButtonListItem";
import Menu from "@material-ui/icons/Menu";

const useStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      padding: 0,
      alignItems: "end",
      justifyContent: "flex-end",
    },
  })
);

export default function SideDrawer(buttonList: ButtonListItem[]) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (open: boolean) => () => {
    setState({ ...state, open: open });
  };

  const list = () => (
    <div role="presentation">
      <List>
        {buttonList.map((x) => {
          return (
            <ListItem button key={x.text} onClick={x.click}>
              <ListItemIcon>{x.icon}</ListItemIcon>
              <ListItemText primary={x.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );

  return (
    <div key={"right"}>
      <Button onClick={toggleDrawer(true)} className={classes.menuButton}>
        <Menu />
      </Button>
      <Drawer anchor={"right"} open={state.open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
