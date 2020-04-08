import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolbarMaterial from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavigationItems from "./NavigationsItems";
import WithClass from "../../hoc/WithClass";
import SideDrawer from "./SideDrawer";
import ButtonListItem from "../../models/ButtonListItem";
import BookIcon from "@material-ui/icons/Book";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    navigationItems: {
      "@media (max-width: 499px)": {
        display: "none",
      },
    },
    sideDrawer: {
      "@media (min-width: 500px)": {
        display: "none",
      },
    },
  })
);

export default function Toolbar() {
  const classes = useStyles();
  const history = useHistory();

  const options: ButtonListItem[] = [
    {
      icon: <BookIcon />,
      text: "Início",
      click: () => history.push("/"),
    },
    {
      icon: <AccessibilityNewIcon />,
      text: "Conheça a gente",
      click: () => {},
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={0}>
        <Container maxWidth="lg">
          <ToolbarMaterial>
            <Typography variant="h5" className={classes.title}>
              Cultivando Ideias
            </Typography>
            <WithClass className={classes.navigationItems}>
              <NavigationItems buttonList={options} />
            </WithClass>
            <WithClass className={classes.sideDrawer}>
              <SideDrawer buttonList={options} />
            </WithClass>
          </ToolbarMaterial>
        </Container>
      </AppBar>
    </div>
  );
}
