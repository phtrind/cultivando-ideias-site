import React from "react";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

import Post from "../../models/Post";

import Outdoor from "./../../components/Outdoor/Outdoor";
import PostList from "../../components/PostList/PostList";

const useStyles = makeStyles(() =>
  createStyles({
    postsList: {
      // paddingTop: "40px",
      // paddingBottom: "40px",
    },
  })
);

const postList = [
  new Post(
    "dqE7u6Cm7NYRotmjCfRc",
    "Como eu saí completamente da minha zona de conforto",
    "Pedro Trindade",
    "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
    ["pt-BR", "en-US"],
    new Date("2020-02-27T17:00:00.000Z")
  ),
    new Post(
      "a5213as2d13a5s1d3da1",
      "Como eu saí completamente da minha zona de conforto",
      "Pedro Trindade",
      "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
      ["pt-BR", "en-US"],
      new Date("2020-02-27T17:00:00.000Z")
    ),
];

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Outdoor />
      <Container maxWidth="sm" className={classes.postsList}>
        {PostList(postList)}
      </Container>
    </React.Fragment>
  );
}
