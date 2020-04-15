import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { Container, Grid, Tabs, Tab, Fab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Toolbar from "../../components/Toolbar/Toolbar";
import LanguagesIcon from "../../components/Language/LanguageIcon";
import DraftEditor from "../../components/Draft/DraftEditor/DraftEditor";
import SelectMenu from "../../components/Prefabs/Forms/SelectMenu";
import MultipleSelectMenu from "../../components/Prefabs/Forms/MultipleSelectMenu";
import SnackBar from "../../components/Prefabs/Feedback/Snackbar";
import Loading from "../../components/Prefabs/Feedback/Loading";

import { postsServiceApi, authorsServiceApi } from "../../shared/constants";
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
    authorsList: [] as KeyValue[],
    author: "",
    tab: 0,
    drafts: [] as Draft[],
    validationSnackbar: false,
    validationMessage: [] as string[],
    loading: true,
  });

  useEffect(() => {
    axios
      .get(`${authorsServiceApi}combo`)
      .then((response) => {
        setState((s) => ({ ...s, authorsList: response.data, loading: false }));
      })
      .catch((error) => {
        setState((s) => ({ ...s, loading: false }));
        console.log(error);
      });
  }, []);

  const classes = useStyles();
  const history = useHistory();

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
      let draftLanguage,
        draftState = "",
        draftTitle = "",
        draftSummary = "";
      if (existentDraft.length > 0) {
        draftLanguage = existentDraft[0].language;
        draftState = existentDraft[0].value;
        draftTitle = existentDraft[0].title;
        draftSummary = existentDraft[0].summary;
      } else {
        draftLanguage = Languages.find((x) => x.id === option);
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
    const newPost = getNewPost();

    console.log(newPost);
    console.log(JSON.stringify(newPost));

    setState((s) => ({ ...s, loading: true }));

    axios
      .post(postsServiceApi, newPost)
      .then((response) => {
        history.push(`/post/${response.data}/${newPost.contents[0].language}`);
      })
      .catch((error) => {
        setState((s) => ({ ...s, loading: false }));
        showErrorMessage(["Erro ao salvar"]);
        console.log(error);
      });
  };

  const publishIsValid = (author: string, drafts: Draft[]): boolean => {
    let messages: string[] = [];
    if (author.length === 0) {
      messages.push("Selecione o autor");
    }
    drafts.forEach((draft) => {
      if (draft.title.length === 0) {
        messages.push(`Preencha o título (${draft.language.name})`);
      }
      if (draft.summary.length === 0) {
        messages.push(`Preencha o resumo (${draft.language.name})`);
      }
      if (draft.value.length === 0) {
        messages.push(`Preencha o conteúdo (${draft.language.name})`);
      }
    });

    const isValid = messages.length === 0;

    if (!isValid) {
      showErrorMessage(messages);
    }

    return isValid;
  };

  const showErrorMessage = (messages: string[]) => {
    setState({
      ...state,
      validationMessage: messages,
      validationSnackbar: true,
    });
  };

  const getNewPost = (): NewPost => {
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
    return post;
  };

  return (
    <React.Fragment>
      <Toolbar showTitle title="Novo post" showMenu={false} />
      <div className={classes.root}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <SelectMenu
                items={state.authorsList}
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
          <SnackBar
            open={state.validationSnackbar}
            message={state.validationMessage.join("\n")}
            onClose={() =>
              setState({
                ...state,
                validationSnackbar: false,
                validationMessage: [],
              })
            }
            severity="error"
          />
        </Container>
      </div>
      <Loading open={state.loading} />
    </React.Fragment>
  );
}
