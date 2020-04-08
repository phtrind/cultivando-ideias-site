import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import PostModel from "../../models/Post";

import { InfoBar, InfoBarModel } from "./InfoBar";
import { AuthorInfo, AuthorInfoModel } from "./AuthorInfo";

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

export default function Post(post: PostModel) {
  const classes = useStyles();

  const languageChangedHandler = (language: string): void => {};

  const infoBarModel = new InfoBarModel(
    post.author.image,
    post.author.name,
    post.datetime,
    post.content.availableLanguages,
    post.content.language,
    languageChangedHandler
  );

  const authorInfo = new AuthorInfoModel(
    post.author.image,
    post.author.name,
    post.author.bio.data
  );

  return (
    <React.Fragment>
      <div className={classes.marginBottom}>
        <Typography variant="h4">{post.content.title}</Typography>
      </div>
      <div className={classes.marginBottom}>{InfoBar(infoBarModel)}</div>
      <Divider />
      <div className={classes.content}>
        <Typography variant="body1" paragraph={true}>
          I can clearly remember one day, maybe two years ago, when I was kind
          of unmotivated thinking about the life that a person in my home
          country needs to have aiming to succeed. Considering that success is
          having a comfortable and safe life without going through any kind of
          need, either alone or with family. I wasn’t enthusiastic reasoning
          about that.
        </Typography>
        <Typography variant="body1" paragraph={true}>
          To achieve this goal I would probably have to work hard for maybe
          40–60 hours weekly, struggling to save money for many years looking
          for, perhaps and only perhaps, having the opportunity to enjoy it as
          soon as I get enough resources to stop working. Here we reached an
          incredibly important spot on this train of thought.
        </Typography>
        <Typography variant="body1" paragraph={true}>
          Firstly, during this period that I am going to call “Working Hard
          Time”, I wouldn’t have both time and mental conditions of spending
          time with the people who love me as they deserve, what we can say that
          is the most important aspect, once this is the most valuable thing
          that we have in life: love. Furthermore, when we think about
          retirement or financial independence, considering the Brazilian
          models, it’s plausible to say that it usually requires lots of time,
          consequently, it requires you to be able of reaching the third age,
          which is something that we cannot control at all. Regard to that, the
          only thing that we can do is having healthy habits and hoping that
          it’s enough. That said, supposing that I would conquer it, let’s think
          about an interesting fact. Acknowledging that I’ll be an old
          financially independent man, will I have the required willing and
          health conditions to enjoy my life in a way that makes all my long
          “Working Hard Time” worth it?
        </Typography>
        <Typography variant="body1" paragraph={true}>
          Accordingly, I was discussing these points with a big friend of mine
          and we concluded that if I wanted to turn the tables and live abroad I
          would doubtless have to set the English as my main focus. At that
          time, I had basic English skills, I couldn’t even have a simple
          speaking conversation. He, on the other hand, had already had an
          experience abroad and had started having personal English classes a
          few months before. I ended up motivated by him and it changed my life.
          This is a perfect example of something that I’ve been learning during
          my life as well as reading in many self-improvement articles and
          books: we should choose wisely the people who we spend time with and
          who are our close friends because, doing it accurately, they can help
          you to be the best version of yourself.
        </Typography>
      </div>
      <Divider />
      <div className={classes.marginTop}>{AuthorInfo(authorInfo)}</div>
    </React.Fragment>
  );
}
