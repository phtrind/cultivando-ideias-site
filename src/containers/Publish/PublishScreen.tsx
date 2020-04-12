import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, Tabs, Tab, Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Toolbar from "../../components/Toolbar/Toolbar";
import LanguagesIcon from "../../components/Language/LanguageIcon";
import DraftEditor from "../../components/Draft/DraftEditor/DraftEditor";
import SelectMenu from "../../components/Prefabs/Forms/SelectMenu";
import MultipleSelectMenu from "../../components/Prefabs/Forms/MultipleSelectMenu";

import Languages from "../../constants/Languages";
import Language from "../../models/Language";
import KeyValue from "../../models/KeyValue";
import Content from "../../models/Content";
import NewPost from "../../models/NewPost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "20px",
      marginBottom: "20px",
    },
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
    key: "JcyVWytzvp5ahqzquc8N",
    value: "Cilas",
  },
  {
    key: "XDCQa1UMRG0bo0JHfZxR",
    value: "Lorrayne",
  },
  {
    key: "CC03scKlCGUuLEPkBeu5",
    value: "Pedro",
  },
  {
    key: "U7BSnqDAV1PjgKdcQfuD",
    value: "Raphael",
  },
];

const languageOptions: KeyValue[] = Languages.map((language) => {
  return { key: language.id, value: language.name } as KeyValue;
});

interface Draft {
  language: Language;
  title: string;
  summary: string;
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
      let draftLanguage, draftState, draftTitle, draftSummary;
      if (existentDraft.length > 0) {
        draftLanguage = existentDraft[0].language;
        draftState = existentDraft[0].value;
        draftTitle = existentDraft[0].title;
        draftSummary = existentDraft[0].summary;
      } else {
        draftLanguage = Languages.find((x) => x.id === option);
        draftState = {};
      }
      return {
        language: draftLanguage,
        value: draftState,
        title: draftTitle,
        summary: draftSummary,
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

  const draftSummaryChangedHandler = (summary: string, index: number) => {
    const drafts = state.drafts;
    drafts[index].summary = summary;
    setState({ ...state, drafts: drafts });
  };

  const publish = () => {
    if (!publishIsValid(state.author, state.drafts)) {
      return;
    }

    const contents: Content[] = state.drafts.map((draft) => {
      return {
        title: draft.title,
        summary: draft.summary,
        language: draft.language.id,
        data: draft.value,
      } as Content;
    });
    const post: NewPost = {
      author: state.author,
      contents: contents,
    };
    console.log(post);
    console.log(JSON.stringify(post));
  };

  const publishIsValid = (author: string, drafts: Draft[]): boolean => {
    return true;
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
          {state.drafts.length > 0 && (
            <React.Fragment>
              <div className={classes.drafts}>
                <Tabs
                  value={state.tab}
                  onChange={(_e, newValue) =>
                    setState({ ...state, tab: newValue })
                  }
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
                {state.drafts.map((draft, index) => {
                  return (
                    <div hidden={state.tab !== index} key={index}>
                      <DraftEditor
                        onStateChanged={(value) =>
                          draftStateChangedHandler(value, index)
                        }
                        hasTitle
                        initialTitle={draft.title}
                        onTitleChanged={(value) =>
                          draftTitleChangedHandler(value, index)
                        }
                        hasSummary
                        initialSummary={draft.summary}
                        onSummaryChanged={(value) =>
                          draftSummaryChangedHandler(value, index)
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <Fab
                variant="extended"
                className={classes.button}
                onClick={() => publish()}
              >
                Publicar
              </Fab>
            </React.Fragment>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
}
