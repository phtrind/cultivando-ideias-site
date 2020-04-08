import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Icon } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import EnglishIcon from "./../../assets/icons/english.svg";
import PortugueseIcon from "./../../assets/icons/portuguese.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    avatar: {
      marginRight: "10px",
    },
    avatarImage: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    authorInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "50%",
    },
    languages: {
      display: "flex",
      justifyContent: "flex-end",
      alignContent: "center",
      alignItems: "center",
      width: "50%",
    },
    languageIcon: {
      height: "30px",
      width: "30px",
      paddingLeft: "10px",
    },
  })
);

export class InfoBarModel {
  image: string;
  name: string;
  datetime: Date;
  languages: string[];
  selectedLanguage: string;

  constructor(
    image: string,
    name: string,
    datetime: Date,
    languages: string[],
    selectedLanguage: string
  ) {
    this.image = image;
    this.name = name;
    this.datetime = datetime;
    this.languages = languages;
    this.selectedLanguage = selectedLanguage;
  }
}

export function InfoBar(info: InfoBarModel) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.avatar}>
        <Avatar
          className={classes.avatarImage}
          alt={info.name}
          src={info.image}
        />
      </div>
      <div className={classes.authorInfo}>
        <Typography variant="body1" color="primary">
          {info.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {info.datetime.toLocaleDateString("pt-BR")}
        </Typography>
      </div>
      {info.languages.length > 1 && (
        <div className={classes.languages}>
          <Icon className={classes.languageIcon}>
            <img src={PortugueseIcon} alt="Open Portuguese version" />
          </Icon>
          <Icon className={classes.languageIcon}>
            <img src={EnglishIcon} alt="Open English version" />
          </Icon>
        </div>
      )}
    </div>
  );
}
