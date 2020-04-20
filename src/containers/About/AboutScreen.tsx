import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import axios from "axios";
import { Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";

import Toolbar from "../../components/Toolbar/Toolbar";
import Loading from "../../components/Prefabs/Feedback/Loading";

import { authorsServiceApi } from "../../shared/constants";
import Author from "../../models/Author";
import Outdoor from "../../components/Outdoor/Outdoor";

const bio =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet dictum sit amet justo donec enim diam vulputate. Morbi leo urna molestie at elementum eu. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Egestas fringilla phasellus faucibus scelerisque. Quam pellentesque nec nam aliquam sem. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Id diam vel quam elementum pulvinar. Tristique senectus et netus et malesuada fames ac. Nibh nisl condimentum id venenatis a condimentum vitae. At varius vel pharetra vel turpis nunc eget. Faucibus purus in massa tempor nec feugiat nisl pretium.\n\nA condimentum vitae sapien pellentesque habitant morbi. Tristique risus nec feugiat in fermentum posuere urna nec tincidunt. Purus semper eget duis at tellus. Amet risus nullam eget felis. Morbi tristique senectus et netus et. Eget lorem dolor sed viverra. Scelerisque purus semper eget duis at tellus at urna condimentum. Mattis vulputate enim nulla aliquet porttitor lacus. Dui sapien eget mi proin sed libero enim sed faucibus. Posuere morbi leo urna molestie. Sagittis eu volutpat odio facilisis mauris sit. Facilisis magna etiam tempor orci eu. Sed turpis tincidunt id aliquet. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Nunc mattis enim ut tellus elementum. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Purus sit amet volutpat consequat mauris.";

const bioCilas =
  "Quem diria, aqui estou eu, compartilhando ideias abertamente! A pouco tempo estavam somente no bloco de notas e na minha mente, mas agora me sinto a vontade para publicá-las livremente. Não faço por fãs nem plateias, faço por quem soma e cultiva ideias. Tenho 22 anos e me amarro em escrever versos desde os 16. Sempre faço questão de escrever em horas vagas do dia a dia, nem que seja um único verso. Seja por gosto, prazer, vontade de compartilhar vivências, ideias, pensamentos, um grande ponto que me faz escrever é a real necessidade de me expressar e passar pra fora o que sinto e penso por dentro. Escrevo músicas, poesias, frases e até alguns versos que acabo me apegando e considerando um registro do que eu estava pensando e sentindo naquele momento. Podemos dizer que é tipo uma fotografia em forma de versos, tá ligado? Essa é uma breve introdução e estarei por aqui compartilhando minhas mil ideias em versos! Tamo junto !";

const bioLorrayne =
  "Meu nome é Lorrayne Anacleto, tenho 24 anos, sou ariana, formada em Recursos Humanos, atualmente estudante de Direito e nasci na cidade de Belo Horizonte/MG. Ainda incerta da carreira que vou seguir, só desejo ser feliz no que eu fizer e que eu goste do meu trabalho. E os meus amigos estão no meu plano futuro. Gosto de ler e ultimamente despertei o interesse em escrever. Sinto que tem me ajudado bastante a organizar os meus pensamentos e sentimentos. Quando criança, eu gostava de escrever, mas nada formal, eu gostava de escrever no diário ou então em algum papel qualquer sobre coisas e acontecimentos aleatórios, sentia que era uma conversa comigo mesma e aquilo me fazia bem. O tempo foi passando, responsabilidades foram chegando e acabei abandonando esse hábito. Felizmente, eu resgatei o hábito de escrever e tenho relembrado o quanto é gratificante. Hoje é como se eu conseguisse estar mais centrada à minha vida, e de fato, acredito que estou. Confesso que tive um receio inicial, sem saber como me sairia, mas tenho ficado feliz comigo e cada vez mais eu percebo que não existe uma fórmula mágica, é algo que só depende de mim. Escrever tem se tornado um hobbie para mim, é um momento de calmaria, eu coloco uma música e deixo fluir. Tem sido o meu momento favorito do dia. Além de perceber o quanto é algo positivo na minha vida, eu penso que posso levar algo bom à outro alguém através da escrita e isso me motiva muito.";

const authors: Author[] = [
  {
    id: "1",
    name: "Cilas Henrique",
    image:
      "https://miro.medium.com/fit/c/256/256/1*0O1b2jd7ohWuwtPMK_wyxQ.jpeg",
    bio: {
      data: bioCilas,
      language: "pt-BR",
      availableLanguages: ["pt-BR"],
    },
  },
  {
    id: "2",
    name: "Lorrayne Anacleto",
    image:
      "https://miro.medium.com/fit/c/256/256/2*waJhQzje9XLSPOg6IHWIMQ.jpeg",
    bio: {
      data: bioLorrayne,
      language: "pt-BR",
      availableLanguages: ["pt-BR"],
    },
  },
  {
    id: "3",
    name: "Pedro Trindade",
    image:
      "https://miro.medium.com/fit/c/256/256/2*tlU8XfMKZxUWEeI-TFF5NA.jpeg",
    bio: {
      data: bio,
      language: "pt-BR",
      availableLanguages: ["pt-BR"],
    },
  },
  {
    id: "4",
    name: "Raphael Pereira",
    image:
      "https://miro.medium.com/fit/c/256/256/2*Hnm0N_fqLg_3zucw711AVw.jpeg",
    bio: {
      data: bio,
      language: "pt-BR",
      availableLanguages: ["pt-BR"],
    },
  },
];

function tabProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() =>
  createStyles({
    authorInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "40px",
    },
    avatar: {
      width: "256px",
      height: "256px",
    },
    name: {
      marginTop: "20px",
    },
    bio: {
      marginTop: "20px",
    },
  })
);

export default function AboutScreen() {
  const [state, setState] = useState({
    // authors: [] as Author[],
    authors: authors,
    loading: false,
    tab: 0,
  });

  const classes = useStyles();

  //   useEffect(() => {
  //     axios
  //       .get(`${postsServiceApi}summary/pt-BR`)
  //       .then((response) => {
  //         response.data.forEach((x: PostSummary) => {
  //           x.datetime = new Date(x.datetime);
  //         });
  //         setState(() => ({ posts: response.data, loading: false }));
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setState((s) => ({ ...s, loading: false }));
  //       });
  //   }, []);

  return (
    <React.Fragment>
      <Toolbar showTitle title="Conheça a gente" />
      <Outdoor />
      <Container maxWidth="md">
        <Tabs
          value={state.tab}
          onChange={(_e, newValue) => setState({ ...state, tab: newValue })}
          variant="fullWidth"
        >
          {state.authors.map((x, index) => {
            return (
              <Tab
                key={index}
                label={x.name.split(" ")[0]}
                {...tabProps(index)}
              />
            );
          })}
        </Tabs>
        {state.authors.map((x, index) => {
          return (
            <div key={index} hidden={state.tab !== index}>
              <div className={classes.authorInfo}>
                <div>
                  <Avatar
                    className={classes.avatar}
                    alt={x.name}
                    src={x.image}
                  />
                </div>
                <div className={classes.name}>
                  <Typography
                    variant="body1"
                    color="primary"
                    align="center"
                    paragraph={true}
                  >
                    {x.name}
                  </Typography>
                </div>
                <div className={classes.bio}>
                  <Typography
                    variant="body1"
                    color="primary"
                    align="justify"
                    paragraph={true}
                  >
                    {x.bio.data}
                  </Typography>
                </div>
              </div>
            </div>
          );
        })}
      </Container>
      <Loading open={state.loading} />
    </React.Fragment>
  );
}
