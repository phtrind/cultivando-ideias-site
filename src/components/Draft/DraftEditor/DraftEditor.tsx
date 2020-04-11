import React, { FunctionComponent, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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
  initialContent?: string;
  hasTitle: boolean;
  initialTitle?: string;
  onStateChanged: (json: string) => void;
  onTitleChanged: (value: string) => void;
};

const DraftEditor: FunctionComponent<DraftEditorProps> = ({
  initialContent,
  hasTitle,
  initialTitle,
  onStateChanged,
  onTitleChanged,
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

  const titleChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChanged(event.target.value);
  };

  return (
    <div className={classes.root}>
      {hasTitle && (
        <TextField
          label="Título"
          value={initialTitle}
          onChange={titleChangedHandler}
          fullWidth
        />
      )}
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
