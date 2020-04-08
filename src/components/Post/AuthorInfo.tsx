import React, { FunctionComponent } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    avatar: {
      marginRight: "10px",
    },
    avatarImage: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    authorName: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  })
);

type AuthorInfoProps = {
  image: string;
  name: string;
  bio: string;
};

const AuthorInfo: FunctionComponent<AuthorInfoProps> = ({
  image,
  name,
  bio,
}) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.header}>
        <div className={classes.authorName}>
          <Typography variant="h4" color="primary">
            {name}
          </Typography>
        </div>
        <div className={classes.avatar}>
          <Avatar className={classes.avatarImage} alt={name} src={image} />
        </div>
      </div>
      <div>
        <Typography variant="body1" color="primary" paragraph={true}>
          {bio}
        </Typography>
      </div>
    </div>
  );
};

export default AuthorInfo;
