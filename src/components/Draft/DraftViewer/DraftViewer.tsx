import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import draftToHtml from "draftjs-to-html";

import "./DraftViewer.css";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      fontFamily:
        "'Inria Sans', Georgia, Cambria, 'Times New Roman', Times, serif;",
      lineHeight: "33px",
      fontSize: "21px",
      fontWeight: 200,
    },
  })
);

type DraftViewerProps = {
  content: string;
};

const DraftViewer: FunctionComponent<DraftViewerProps> = ({ content }) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      dangerouslySetInnerHTML={{ __html: draftToHtml(JSON.parse(content)) }}
    ></div>
  );
};

export default DraftViewer;
