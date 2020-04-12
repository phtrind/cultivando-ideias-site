import React, { FunctionComponent, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw, EditorState } from "draft-js";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      paddingTop: "10px",
      fontFamily:
        "'Inria Sans', Georgia, Cambria, 'Times New Roman', Times, serif;",
      lineHeight: "33px",
      fontSize: "21px",
      fontWeight: 100,
    },
    section: {
      marginBottom: "20px",
    },
  })
);

type DraftEditorProps = {
  initialContent?: string;
  hasTitle?: boolean;
  initialTitle?: string;
  hasSummary?: boolean;
  initialSummary?: string;
  onStateChanged: (json: string) => void;
  onTitleChanged?: (value: string) => void;
  onSummaryChanged?: (value: string) => void;
};

const DraftEditor: FunctionComponent<DraftEditorProps> = ({
  initialContent,
  hasTitle,
  initialTitle,
  hasSummary,
  initialSummary,
  onStateChanged,
  onTitleChanged,
  onSummaryChanged,
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
    if (onTitleChanged !== undefined) {
      onTitleChanged(event.target.value);
    }
  };

  const summaryChangedHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value: string = event.target.value;
    if (onSummaryChanged !== undefined && value.length <= 200) {
      onSummaryChanged(event.target.value);
    }
  };

  return (
    <div className={classes.root}>
      {hasTitle && (
        <div className={classes.section}>
          <TextField
            label="Título"
            value={initialTitle}
            onChange={titleChangedHandler}
            fullWidth
          />
        </div>
      )}
      {hasSummary && (
        <div className={classes.section}>
          <TextField
            label="Resumo (exibido na lista de posts)"
            value={initialSummary}
            onChange={summaryChangedHandler}
            fullWidth
            multiline
          />
        </div>
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
