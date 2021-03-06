import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolbarMaterial from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BookIcon from "@material-ui/icons/Book";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { Container } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";

import WithClass from "../../hoc/WithClass";
import NavigationItems from "./NavigationsItems";
import SideDrawer from "./SideDrawer";
import ButtonListItem from "../../models/ButtonListItem";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbarMaterial: {
      padding: 0,
    },
    leftOptions: {
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
  showTitle?: boolean;
  showBackButton?: boolean;
  backClick?: () => void;
  showMenu?: boolean;
  title?: string;
};

const Toolbar: FunctionComponent<ToolbarProps> = ({
  showTitle,
  showBackButton,
  backClick,
  showMenu,
  title,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const options: ButtonListItem[] = [
    {
      icon: <BookIcon />,
      text: "Postagens",
      click: () => history.push("/"),
    },
    {
      icon: <AccessibilityNewIcon />,
      text: "Conheça a gente",
      click: () => history.push("/about"),
    },
  ];

  const shownTitle = useMediaQuery("(min-width:500px)")
    ? "Cultivando Ideias"
    : title;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" elevation={3}>
        <Container maxWidth="md">
          <ToolbarMaterial className={classes.toolbarMaterial}>
            <div className={classes.leftOptions}>
              {showBackButton && (
                <Button
                  className={classes.backButton}
                  onClick={() =>
                    backClick !== undefined ? backClick() : history.goBack()
                  }
                >
                  <ArrowBackIcon />
                </Button>
              )}
              {showTitle && <Typography variant="h5">{shownTitle}</Typography>}
            </div>
            {(showMenu === undefined || showMenu === true) && (
              <React.Fragment>
                <WithClass className={classes.navigationItems}>
                  <NavigationItems buttonList={options} />
                </WithClass>
                <WithClass className={classes.sideDrawer}>
                  <SideDrawer buttonList={options} />
                </WithClass>
              </React.Fragment>
            )}
          </ToolbarMaterial>
        </Container>
      </AppBar>
    </div>
  );
};

export default Toolbar;
