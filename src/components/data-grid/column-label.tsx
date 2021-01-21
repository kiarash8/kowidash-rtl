import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { Grid, Typography } from '@material-ui/core';
import { ColumnLabelProps } from './model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root:{
      height: 25,
    },
    clickable:{
        cursor: 'pointer'
    },
    orderBtn: {
      marginLeft: theme.spacing(1)
    }
  }),
);

const ColumnLabel: React.FC<ColumnLabelProps> = ({id, title, sort, sorting}) => {
  const classes = useStyles();
  const [order, setOrder] = useState<'asc' | 'desc' | undefined>(undefined);

  const orderIcon = () => {
      switch (order) {
          case 'asc':
              return <ArrowUpwardIcon fontSize="inherit" />
          case 'desc':
              return <ArrowDownwardIcon fontSize="inherit" />
      }
  }

  const changeOrder = () => {
    const newOrder = (order === undefined ? 'asc' : order === 'asc' ? 'desc' : undefined);
    sorting(id, newOrder);
    setOrder(newOrder);
  }

  return (
    <Grid
        container
        className={classes.root}
        direction="row"
        justify="flex-start"
        alignItems="center">
        <Grid item>
          <Typography
            onClick={sort ? changeOrder : () => {}}
            className={clsx({[classes.clickable]: sort})}
            variant="subtitle2">{title}</Typography>
        </Grid>
        {sort && <Grid item><IconButton onClick={changeOrder} className={classes.orderBtn} size="small">{orderIcon()}</IconButton></Grid>}
    </Grid>
  )
}

export default ColumnLabel;