import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    avatar: {
      marginRight: "10px",
    },
    avatarImage: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    authorName: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

export class AuthorInfoModel {
  image: string;
  name: string;
  bio: string;

  constructor(image: string, name: string, bio: string) {
    this.image = image;
    this.name = name;
    this.bio = bio;
  }
}

export function AuthorInfo(info: AuthorInfoModel) {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.authorName}>
          <Typography variant="h4" color="primary">
            {info.name}
          </Typography>
        </div>
        <div className={classes.avatar}>
          <Avatar
            className={classes.avatarImage}
            alt={info.name}
            src={info.image}
          />
        </div>
      </div>
      <div>
        <Typography variant="body1" color="primary">
          {info.bio}
        </Typography>
      </div>
    </div>
  );
}
