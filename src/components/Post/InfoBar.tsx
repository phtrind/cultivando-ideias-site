import React, { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LanguagesMenu from "../Language/LanguagesMenu";

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
      width: "50%",
    },
  })
);

export interface InfoBarModel {
  image: string;
  name: string;
  datetime: Date;
  languages: string[];
  selectedLanguage: string;
  selectedLanguageHandler: Function;
}

type InfoBarProps = {
  info: InfoBarModel;
};

const InfoBar: FunctionComponent<InfoBarProps> = ({ info }) => {
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
          {info.datetime.toLocaleDateString(info.selectedLanguage)}
        </Typography>
      </div>
      {info.languages.length > 1 && (
        <div className={classes.languages}>
          <LanguagesMenu
            current={info.selectedLanguage}
            options={info.languages}
            selectedHandler={info.selectedLanguageHandler}
          />
        </div>
      )}
    </div>
  );
};

export default InfoBar;
