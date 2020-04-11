import React, { FunctionComponent, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      fontFamily:
        "'Inria Sans', Georgia, Cambria, 'Times New Roman', Times, serif;",
      lineHeight: "33px",
      fontSize: "21px",
      fontWeight: 100,
    },
  })
);

type DraftEditorProps = {
  onStateChanged: (json: string) => void;
  initialContent?: string;
};

const DraftEditor: FunctionComponent<DraftEditorProps> = ({
  onStateChanged,
  initialContent,
}) => {
  const [state, setState] = useState(() => {
    let initialState: EditorState;
    if (initialContent !== undefined) {
      initialState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(initialContent))
      );
    } else {
      initialState = EditorState.createEmpty();
    }
    return { editorState: initialState };
  });

  const classes = useStyles();

  const editorStateChangedHandler = (state: EditorState) => {
    setState({ editorState: state });
    onStateChanged(JSON.stringify(state));
  };

  return (
    <div className={classes.root}>
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        defaultEditorState={state.editorState}
        onEditorStateChange={editorStateChangedHandler}
      />
    </div>
  );
};

export default DraftEditor;
