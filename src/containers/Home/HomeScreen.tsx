import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";

import Outdoor from "../../components/Outdoor/Outdoor";
import PostList from "../../components/PostList/PostList";
import Toolbar from "../../components/Toolbar/Toolbar";
import Loading from "../../components/Prefabs/Feedback/Loading";

import { postsServiceApi } from "../../shared/constants";
import PostSummary from "../../models/PostSummary";

export default function HomeScreen() {
  const [state, setState] = useState({
    posts: [] as PostSummary[],
    loading: true,
  });

  useEffect(() => {
    axios
      .get(`${postsServiceApi}summary/pt-BR`)
      .then((response) => {
        response.data.forEach((x: PostSummary) => {
          x.datetime = new Date(x.datetime);
        });
        setState(() => ({ posts: response.data, loading: false }));
      })
      .catch((error) => {
        console.log(error);
        setState((s) => ({ ...s, loading: false }));
      });
  }, []);

  return (
    <React.Fragment>
      <Toolbar showTitle title="Cultivando Ideias" />
      <Outdoor />
      <Container maxWidth="sm">
        <PostList posts={state.posts} />
      </Container>
      <Loading open={state.loading} />
    </React.Fragment>
  );
}
