import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";

import EnglishIcon from "./../../assets/icons/english.svg";
import PortugueseIcon from "./../../assets/icons/portuguese.svg";
import SpanishIcon from "./../../assets/icons/spanish.svg";

const useStyles = makeStyles(() =>
  createStyles({
    languageIcon: {
      height: "30px",
      width: "30px",
      paddingLeft: "10px",
    },
    pointer: {
      cursor: "pointer",
    },
  })
);

type LanguagesIconProps = {
  language: string;
  clickable: boolean;
  click: (language: string) => void;
};

const LanguagesIcon: FunctionComponent<LanguagesIconProps> = ({
  language,
  clickable,
  click: onClick,
}) => {
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

  const clickHandler = () => {
    if (!clickable) {
      return;
    }

    onClick(language);
  };

  return (
    <Icon className={classes.languageIcon}>
      <img
        className={clickable !== null ? classes.pointer : undefined}
        src={getIcon(language)}
        alt={language}
        onClick={clickHandler}
      />
    </Icon>
  );
};

export default LanguagesIcon;
