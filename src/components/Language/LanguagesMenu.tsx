import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import LanguagesIcon from "./LanguageIcon";

const useStyles = makeStyles(() =>
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

type LanguagesMenuProps = {
  current: string;
  options: string[];
  selectedHandler: Function;
};

const LanguagesMenu: FunctionComponent<LanguagesMenuProps> = ({
  current,
  options,
  selectedHandler,
}) => {
  const classes = useStyles();

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
          <LanguagesIcon
            key={x}
            language={x}
            click={languageClicked}
          />
        );
      })}
    </div>
  );
};

export default LanguagesMenu;
