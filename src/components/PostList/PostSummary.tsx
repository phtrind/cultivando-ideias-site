import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import Post from "../../models/Post";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        marginTop: "40px",
        marginBottom: "40px",
    },
    summary: {
      marginBottom: "10px",
      marginTop: "10px",
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
    },
    footerData: {
      color: theme.palette.primary.main,
    },
  })
);

export default function PostSummary(post: Post) {
  const classes = useStyles();

  return (
    <div key={post.id} className={classes.root}>
      <div>
        <Typography variant="h4">{post.title}</Typography>
      </div>
      <div className={classes.summary}>
        <Typography variant="body1" color="textSecondary">
          {post.content}
        </Typography>
      </div>
      <div className={classes.footer}>
        <Typography variant="body1" color="secondary">
          Postado por <span className={classes.footerData}>{post.author}</span>{" "}
          em{" "}
          <span className={classes.footerData}>
            {post.datetime.toLocaleDateString("pt-br")}
          </span>
        </Typography>
      </div>
    </div>
  );
}
