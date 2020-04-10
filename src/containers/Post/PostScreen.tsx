import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";

import PostModel from "../../models/Post";
import Post from "../../components/Post/Post";
import Toolbar from "../../components/Toolbar/Toolbar";

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

export default function PostScreen() {
  const [state, setState] = useState({
    post: {} as PostModel,
    loading: true,
  });

  const classes = useStyles();
  const history = useHistory();
  const { id, language } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5003/cultivando-ideias/us-central1/api/posts/${id}/${language}`
      )
      .then((response) => {
        response.data.datetime = new Date(response.data.datetime);
        setState(() => ({ post: response.data, loading: false }));
      })
      .catch((error) => console.log(error));
  }, [id, language]);

  const languageChangedHandler = (language: string): void => {
    history.push(`/post/${state.post?.id}/${language}`);
  };

  return state.post.id ? (
    <React.Fragment>
      <Toolbar backButton={true} home={false} />
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Post
            post={state.post}
            languageChangedHandler={languageChangedHandler}
          />
        </Container>
      </div>
    </React.Fragment>
  ) : (
    <p>Carregando</p>
  );
}
