import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  }),
);

export function Container(props:any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Paper elevation={0} variant="outlined" className={classes.paper}>
            {props.children}
      </Paper>
    </div>
  );
}