import React, { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import PostSummaryModel from "../../models/PostSummary";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    summary: {
      marginBottom: "10px",
      marginTop: "10px",
    },
    footerData: {
      marginTop: "10px",
      color: theme.palette.primary.main,
    },
  })
);

type PostSummaryProps = {
  post: PostSummaryModel;
};

const PostSummary: FunctionComponent<PostSummaryProps> = ({ post }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      className={classes.root}
      onClick={() => history.push(`/post/${post.id}/pt-BR`)}
    >
      <div>
        <Typography variant="h4">{post.title}</Typography>
      </div>
      <div className={classes.summary}>
        <Typography variant="body1" color="textSecondary">
          {post.content}
        </Typography>
      </div>
      <div>
        <Typography variant="body1" color="secondary">
          Postado por <span className={classes.footerData}>{post.author}</span>{" "}
          em{" "}
          <span className={classes.footerData}>
            {post.datetime.toLocaleDateString("pt-BR")}
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default PostSummary;
