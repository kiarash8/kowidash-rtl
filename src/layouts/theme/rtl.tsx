import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/styles';

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default function RTL(props:any) {
  return (
    <StylesProvider jss={jss}>
      {props.children}
    </StylesProvider>
  );
}