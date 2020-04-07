import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, Icon } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import PostModel from "../../models/Post";

import EnglishIcon from "./../../assets/icons/english.svg";
import PortugueseIcon from "./../../assets/icons/portuguese.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   marginTop: "40px",
      //   marginBottom: "40px",
    },
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

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4">{post.title}</Typography>
      </div>
      <div className={classes.infoAndOptions}>
        <div className={classes.avatar}>
          <Avatar
            className={classes.avatarImage}
            alt={post.author.name}
            src={post.author.image}
          />
        </div>
        <div className={classes.authorInfo}>
          <Typography variant="body1" color="primary">
            {post.author.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {post.datetime.toLocaleDateString("pt-BR")}
          </Typography>
        </div>
        <div className={classes.languageAndShare}>
          <Icon className={classes.languageIcon}>
            <img src={PortugueseIcon} alt="Open Portuguese version" />
          </Icon>
          <Icon className={classes.languageIcon}>
            <img src={EnglishIcon} alt="Open English version" />
          </Icon>
        </div>
      </div>
    </div>
  );
}
