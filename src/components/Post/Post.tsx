import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import PostModel from "../../models/Post";

import { InfoBar, InfoBarModel } from "./InfoBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginBottom: "20px",
    },
    infoAndOptions: {
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
    languageAndShare: {
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

export default function Post(post: PostModel) {
  const classes = useStyles();
  const infoBarModel = new InfoBarModel(
    post.author.image,
    post.author.name,
    post.datetime,
    post.languages
  );

  return (
    <React.Fragment>
      <div className={classes.title}>
        <Typography variant="h4">{post.title}</Typography>
      </div>
      {InfoBar(infoBarModel)}
    </React.Fragment>
  );
}
