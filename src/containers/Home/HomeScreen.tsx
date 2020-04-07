import React from "react";
import { Container } from "@material-ui/core";

import PostSummary from "../../models/PostSummary";

import Outdoor from "../../components/Outdoor/Outdoor";
import PostList from "../../components/PostList/PostList";

const postList = [
  new PostSummary(
    "dqE7u6Cm7NYRotmjCfRc",
    "Como eu saí completamente da minha zona de conforto",
    "Pedro Trindade",
    "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
    ["pt-BR", "en-US"],
    new Date("2020-02-27T17:00:00.000Z")
  ),
  new PostSummary(
    "a5213as2d13a5s1d3da1",
    "Como eu saí completamente da minha zona de conforto",
    "Pedro Trindade",
    "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
    ["pt-BR", "en-US"],
    new Date("2020-02-27T17:00:00.000Z")
  ),
];

export default function HomeScreen() {
  return (
    <React.Fragment>
      <Outdoor />
      <Container maxWidth="sm">{PostList(postList)}</Container>
    </React.Fragment>
  );
}
