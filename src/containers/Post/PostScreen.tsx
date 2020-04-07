import React from "react";
import { Container } from "@material-ui/core";

import Post from "../../models/Post";

const post = new Post(
  "dqE7u6Cm7NYRotmjCfRc",
  "Como eu saí completamente da minha zona de conforto",
  "Pedro Trindade",
  "Eu posso me lembrar perfeitamente de um dia, talvez dois anos atrás, quando eu estava um pouco desmotivado pensando sobre a vida que uma pessoa que vive no meu país de origem precisa ter para buscar o sucesso.",
  ["pt-BR", "en-US"],
  new Date("2020-02-27T17:00:00.000Z")
);

export default function PostScreen() {
  return (
    <React.Fragment>
      <Container maxWidth="sm">{post.content}</Container>
    </React.Fragment>
  );
}
