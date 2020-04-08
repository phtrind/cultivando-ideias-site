import React from "react";
import { Container } from "@material-ui/core";

import PostSummary from "../../models/PostSummary";

import Outdoor from "../../components/Outdoor/Outdoor";
import PostList from "../../components/PostList/PostList";

const postList: PostSummary[] = [
  {
    id: "dqE7u6Cm7NYRotmjCfRc",
    title: "Como eu saí completamente da minha zona de conforto",
    author: "Pedro Trindade",
    content:
      "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
    languages: ["pt-BR", "en-US"],
    datetime: new Date("2020-02-27T17:00:00.000Z"),
  },
  {
    id: "5as1d51as2d1asd1",
    title: "Como eu saí completamente da minha zona de conforto",
    author: "Pedro Trindade",
    content:
      "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
    languages: ["pt-BR", "en-US"],
    datetime: new Date("2020-02-27T17:00:00.000Z"),
  },
];

export default function HomeScreen() {
  return (
    <React.Fragment>
      <Outdoor />
      <Container maxWidth="sm">
        <PostList posts={postList} />
      </Container>
    </React.Fragment>
  );
}
