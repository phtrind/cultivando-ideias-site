import React from "react";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import PostModel from "../../models/Post";
import Post from "../../components/Post/Post";
import Author from "../../models/Author";
import Content from "../../models/Content";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: "20px",
      marginBottom: "20px",
      "@media (min-width: 500px)": {
        marginTop: "40px",
        marginBottom: "40px",
      },
    },
    title: {},
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

const post = new PostModel(
  "dqE7u6Cm7NYRotmjCfRc",
  new Author(
    "CC03scKlCGUuLEPkBeu5",
    "Pedro Trindade",
    new Content(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In et urna interdum, pellentesque nunc a, convallis purus. Ut rhoncus mauris quis purus gravida mattis. Nulla non nibh fermentum, volutpat ipsum nec, dignissim orci. Nunc at enim eget lorem vehicula maximus. Vivamus imperdiet leo non enim accumsan, a euismod diam dignissim. Phasellus suscipit sit amet metus vitae volutpat. Nunc tincidunt, metus et auctor ornare, sem erat porttitor felis, id lacinia arcu magna quis mi. Cras ut dui scelerisque, porta dolor nec, volutpat justo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      "pt-BR",
      ["pt-BR", "en-US"]
    ),
    "https://bit.ly/3aVsm7K"
  ),
  new Content(
    "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
    "pt-BR",
    ["pt-BR", "en-US"],
    "Como eu saí completamente da minha zona de conforto"
  ),
  new Date("2020-02-27T17:00:00.000Z")
);

export default function PostScreen() {
  const classes = useStyles();
  const history = useHistory();

  const languageChangedHandler = (language: string): void => {
    history.push(`/post/${post.id}/${language}`);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">{Post(post, languageChangedHandler)}</Container>
    </div>
  );
}
