import React, { FunctionComponent } from "react";
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
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbarMaterial: {
      padding: 0,
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
    backButton: {
      padding: 0,
      justifyContent: "start",
    },
  })
);

type ToolbarProps = {
  home: boolean;
  backButton: boolean;
};

const Toolbar: FunctionComponent<ToolbarProps> = ({ home, backButton }) => {
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
          <ToolbarMaterial className={classes.toolbarMaterial}>
            <div className={classes.title}>
              {backButton && (
                <Button
                  className={classes.backButton}
                  onClick={() => history.goBack()}
                >
                  <ArrowBackIcon />
                </Button>
              )}
              {home && <Typography variant="h5">Cultivando Ideias</Typography>}
            </div>
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
};

export default Toolbar;
