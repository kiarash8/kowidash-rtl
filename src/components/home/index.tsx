import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container } from '../../layouts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      ...
    </Container>
  );
}

export default Home;