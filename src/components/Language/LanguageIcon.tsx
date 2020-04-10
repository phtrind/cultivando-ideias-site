import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import Languages from "../../constants/Languages";

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
    return Languages.filter(x => x.id === culture)[0].icon;
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
