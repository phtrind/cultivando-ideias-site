import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

import EnglishIcon from "./../../assets/icons/english.svg";
import PortugueseIcon from "./../../assets/icons/portuguese.svg";
import SpanishIcon from "./../../assets/icons/spanish.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "flex-end",
      alignContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
    },
    languageIcon: {
      height: "30px",
      width: "30px",
      paddingLeft: "10px",
    },
    iconImage: {
      cursor: "pointer",
    },
  })
);

export default function LanguagesMenu(
  current: string,
  options: string[],
  selectedHandler: Function
) {
  const classes = useStyles();

  const getIcon = (culture: string): string => {
    switch (culture) {
      case "en-US":
        return EnglishIcon;
      case "es-ES":
        return SpanishIcon;
      case "pt-BR":
      default:
        return PortugueseIcon;
    }
  };

  const languageClicked = (selected: string) => {
    if (current === selected) {
      return;
    }
    selectedHandler(selected);
  };

  return (
    <div className={classes.root}>
      {options.map((x) => {
        return (
          <Icon className={classes.languageIcon} key={x}>
            <img
              className={classes.iconImage}
              src={getIcon(x)}
              alt="Select language"
              onClick={() => languageClicked(x)}
            />
          </Icon>
        );
      })}
    </div>
  );
}
