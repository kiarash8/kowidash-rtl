import React from 'react';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

export const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      '& ul':{
        paddingBottom:0,
        paddingTop:0
      }
    },
  })((props: any) => (
    <Menu
      getContentAnchorEl={null}
      PaperProps={{
        style: {
          maxHeight: 260,
          width: 300,
        },
      }}
      {...props}
    />
  ));