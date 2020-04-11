import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Tabs, Tab, Button, Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Toolbar from "../../components/Toolbar/Toolbar";
import LanguagesIcon from "../../components/Language/LanguageIcon";
import DraftEditor from "../../components/Draft/DraftEditor/DraftEditor";
import SelectMenu from "../../components/Forms/SelectMenu";
import MultipleSelectMenu from "../../components/Forms/MultipleSelectMenu";

import Languages from "../../constants/Languages";
import Language from "../../models/Language";
import KeyValue from "../../models/KeyValue";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
      "@media (min-width: 500px)": {
        width: "98%",
      },
    },
    drafts: {
      marginTop: "20px",
    },
    button: {
      margin: theme.spacing(1),
      position: "fixed",
      right: 20,
      bottom: 20,
      zIndex: 9999,
    },
  })
);

function tabProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const authors: KeyValue[] = [
  {
    key: "1",
    value: "Cilas",
  },
  {
    key: "2",
    value: "Lorrayne",
  },
  {
    key: "3",
    value: "Pedro",
  },
  {
    key: "4",
    value: "Raphael",
  },
];

const languageOptions: KeyValue[] = Languages.map((language) => {
  return { key: language.id, value: language.name } as KeyValue;
});

interface Draft {
  language: Language;
  title: string;
  value: string;
}

export default function PublishScreen() {
  const [state, setState] = useState({
    author: "",
    tab: 0,
    drafts: [] as Draft[],
  });

  const classes = useStyles();

  const authorSelectionChanged = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
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
        draftState = existentDraft[0].value;
      } else {
        draftLanguage = Languages.filter((x) => x.id === option)[0];
        draftState = {};
      }
      return {
        language: draftLanguage,
        value: draftState,
      } as Draft;
    });
    setState({ ...state, drafts: selectedDrafts });
  };

  const draftStateChangedHandler = (draftState: string, index: number) => {
    const drafts = state.drafts;
    drafts[index].value = draftState;
    setState({ ...state, drafts: drafts });
  };

  const draftTitleChangedHandler = (title: string, index: number) => {
    const drafts = state.drafts;
    drafts[index].title = title;
    setState({ ...state, drafts: drafts });
  };

  return (
    <React.Fragment>
      <Toolbar showTitle title="Novo post" showMenu={false} />
      <div className={classes.root}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <SelectMenu
                items={authors}
                label="Autor"
                className={classes.formControl}
                value={state.author}
                onChange={authorSelectionChanged}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MultipleSelectMenu
                items={languageOptions}
                label="Idiomas"
                className={classes.formControl}
                value={state.drafts.map((x) => x.language.id)}
                onChange={languagesSelectionChanged}
              />
            </Grid>
          </Grid>
          <div className={classes.drafts}>
            <Tabs
              value={state.tab}
              onChange={(_e, newValue) => setState({ ...state, tab: newValue })}
              variant="fullWidth"
            >
              {state.drafts.map((draft, index) => {
                return (
                  <Tab
                    key={index}
                    icon={<LanguagesIcon language={draft.language.id} />}
                    {...tabProps(index)}
                  />
                );
              })}
            </Tabs>
            {state.drafts.map((_, index) => {
              return (
                <div hidden={state.tab !== index} key={index}>
                  <DraftEditor
                    onStateChanged={(value) =>
                      draftStateChangedHandler(value, index)
                    }
                    onTitleChanged={(value) =>
                      draftTitleChangedHandler(value, index)
                    }
                    hasTitle
                  />
                </div>
              );
            })}
          </div>
          <Fab variant="extended" className={classes.button}>
            Publicar
          </Fab>
        </Container>
      </div>
    </React.Fragment>
  );
}
