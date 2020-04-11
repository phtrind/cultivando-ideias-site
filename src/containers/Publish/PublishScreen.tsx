import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Checkbox,
  ListItemText,
  Tabs,
  Tab,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Editor, RawDraftContentState } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";

import Toolbar from "../../components/Toolbar/Toolbar";

import Language from "../../models/Language";
import Languages from "../../constants/Languages";
import LanguagesIcon from "../../components/Language/LanguageIcon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    // form: {
    //     display: "flex",
    // },
    formGrid: {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    formControl: {
      margin: theme.spacing(1),
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

function tabProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Draft {
  language: Language;
  state: RawDraftContentState;
  title: string;
}

export default function PublishScreen() {
  const [state, setState] = useState({
    author: 0,
    tab: 0,
    drafts: [] as Draft[],
  });

  const classes = useStyles();

  const authorSelectionChanged = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as number;
    setState({ ...state, author: value });
  };

  const languagesSelectionChanged = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const options = event.target.value as string[];
    const selectedDrafts = options.map((option) => {
      const existentDraft = state.drafts.filter(
        (x) => x.language.id === option
      );
      let draftLanguage, draftState;
      if (existentDraft.length > 0) {
        draftLanguage = existentDraft[0].language;
        draftState = existentDraft[0].state;
      } else {
        draftLanguage = Languages.filter((x) => x.id === option)[0];
        draftState = {};
      }
      return {
        language: draftLanguage,
        state: draftState,
      } as Draft;
    });
    setState({ ...state, drafts: selectedDrafts });
  };

  const onContentStateChange = (
    contentState: RawDraftContentState,
    index: number
  ) => {
    const drafts = state.drafts;
    drafts[index].state = contentState;
    setState({ ...state, drafts: drafts });
  };

  return (
    <React.Fragment>
      <Toolbar backButton={true} home={false} />
      <div className={classes.root}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item sm={6} xs={12} className={classes.formGrid}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="author-lable">Autor</InputLabel>
                <Select
                  labelId="author-lable"
                  id="demo-simple-select-filled"
                  value={state.author}
                  onChange={authorSelectionChanged}
                >
                  <MenuItem value={0} disabled={true}>
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value={1}>Cilas</MenuItem>
                  <MenuItem value={2}>Lorrayne</MenuItem>
                  <MenuItem value={3}>Pedro</MenuItem>
                  <MenuItem value={4}>Raphael</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={6} xs={12} className={classes.formGrid}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="language-label">Idiomas</InputLabel>
                <Select
                  labelId="language-label"
                  id="demo-mutiple-checkbox"
                  multiple
                  value={state.drafts.map((x) => x.language.id)}
                  onChange={languagesSelectionChanged}
                  renderValue={(selected) => {
                    const names: string[] = (selected as string[]).map((x) => {
                      return Languages.filter((l) => l.id === x)[0].name;
                    });
                    return names.join(", ");
                  }}
                >
                  {Languages.map((language) => (
                    <MenuItem key={language.id} value={language.id}>
                      <Checkbox
                        checked={state.drafts.some(
                          (x) => x.language.id === language.id
                        )}
                      />
                      <ListItemText primary={language.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Tabs
            value={state.tab}
            onChange={(_e, newValue) => setState({ ...state, tab: newValue })}
            aria-label="simple tabs example"
          >
            {state.drafts.map((draft, index) => {
              return (
                <Tab
                  key={index}
                  label={<LanguagesIcon language={draft.language.id} />}
                  {...tabProps(index)}
                />
              );
            })}
          </Tabs>
          {state.drafts.map((draft, index) => {
            return (
              <div hidden={state.tab !== index} key={index}>
                {draft.language.name}
                <Editor
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onContentStateChange={(state) =>
                    onContentStateChange(state, index)
                  }
                />
              </div>
            );
          })}
        </Container>
      </div>
    </React.Fragment>
  );
}
