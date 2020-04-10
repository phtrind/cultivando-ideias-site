import React, { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import PostModel from "../../models/Post";

import InfoBar, { InfoBarModel } from "./InfoBar";
import AuthorInfo from "./AuthorInfo";
import Content from "./Content/Content";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginBottom: {
      marginBottom: "40px",
    },
    marginTop: {
      marginTop: "40px",
    },
    content: {
      marginTop: "40px",
      marginBottom: "40px",
    },
  })
);

type PostProps = {
  post: PostModel;
  languageChangedHandler: Function;
};

const Post: FunctionComponent<PostProps> = ({
  post,
  languageChangedHandler,
}) => {
  const classes = useStyles();

  const infoBarModel: InfoBarModel = {
    image: post.author.image,
    name: post.author.name,
    datetime: post.datetime,
    languages: post.content.availableLanguages,
    selectedLanguage: post.content.language,
    selectedLanguageHandler: languageChangedHandler,
  };

  return (
    <React.Fragment>
      <div className={classes.marginBottom}>
        <Typography variant="h4">{post.content.title}</Typography>
      </div>
      <div className={classes.marginBottom}>
        <InfoBar info={infoBarModel} />
      </div>
      <Divider />
      <div className={classes.content}>
        <Content content={post.content.data} />
      </div>
      <Divider />
      <div className={classes.marginTop}>
        <AuthorInfo
          image={post.author.image}
          name={post.author.name}
          bio={post.author.bio.data}
        />
      </div>
    </React.Fragment>
  );
};

export default Post;
