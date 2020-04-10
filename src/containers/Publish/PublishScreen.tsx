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

import Toolbar from "../../components/Toolbar/Toolbar";

import Language from "../../models/Language";

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

const languages: Language[] = [
  {
    id: "en-US",
    name: "English",
    icon: "icons/english.svg",
  },
  {
    id: "pt-BR",
    name: "Português",
    icon: "icons/portuguese.svg",
  },
  {
    id: "es-ES",
    name: "Español",
    icon: "icons/spanish.svg",
  },
];

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// interface Draft {
//     language: string;
//     state: Object;
// }

export default function PublishScreen() {
  const [state, setState] = useState({
    age: 0,
    languages: [] as string[],
    tab: 0,
  });

  const classes = useStyles();

  const authorSelectionChanged = () => {};

  const languagesSelectionChanged = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const options = event.target.value as string[];
    setState({ ...state, languages: options });
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
                  value={state.age}
                  onChange={authorSelectionChanged}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
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
                  value={state.languages}
                  onChange={languagesSelectionChanged}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {languages.map((language) => (
                    <MenuItem key={language.id} value={language.id}>
                      <Checkbox
                        checked={state.languages.indexOf(language.id) > -1}
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
            {state.languages.map((selectedLanguage) => {
              const language = languages.filter(
                (x) => x.id === selectedLanguage
              )[0];
              return (
                <Tab
                  label={language.name}
                  {...a11yProps(state.languages.indexOf(selectedLanguage))}
                />
              );
            })}
          </Tabs>
          {state.languages.map((selectedLanguage) => {
            const language = languages.filter(
              (x) => x.id === selectedLanguage
            )[0];
            const index = languages.indexOf(language);
            return <div hidden={state.tab !== index}>{language.name}</div>;
          })}
        </Container>
      </div>
    </React.Fragment>
  );
}
