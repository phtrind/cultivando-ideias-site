import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import PostSummaryModel from "../../models/PostSummary";

import PostSummary from "./PostSummary";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "@media (min-width: 500px)": {
        marginTop: "60px",
      },
    },
    smallScreen: {
      marginTop: "20px",
    },
    normalScreen: {
      marginTop: "10px",
      marginBottom: "50px",
      cursor: "pointer",
    },
  })
);

type PostListProps = {
  posts: PostSummaryModel[];
};

const PostList: FunctionComponent<PostListProps> = ({ posts }) => {
  const classes = useStyles();
  const smallScreen = useMediaQuery("(max-width:499px)");

  return (
    <div className={classes.root}>
      {smallScreen &&
        posts.map((post) => (
          <Card className={classes.smallScreen}>
            <CardContent>
              <PostSummary post={post} key={post.id} />
            </CardContent>
          </Card>
        ))}
      {!smallScreen &&
        posts.map((post) => (
          <div className={classes.normalScreen}>
            <PostSummary post={post} key={post.id} />
          </div>
        ))}
    </div>
  );
};

export default PostList;
