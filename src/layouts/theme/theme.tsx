import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { faIR } from '@material-ui/core/locale';
import { PaletteType } from '@material-ui/core';

interface ITheme {
  children: any;
  paletteType: PaletteType;
}

export default function Theme(props:ITheme) {
  const primaryColor = '#3F51B5';
  const secondaryColor = '#2196F3';
  const backgroundColor = props.paletteType === 'light' ? '#EEF0F4' : '#303030';

  const getMuiTheme = () => {
    return  createMuiTheme({
      direction: 'rtl',
      palette: {
        type: props.paletteType,
        primary: {main: primaryColor},
        secondary: {main: secondaryColor},
        background: {default: backgroundColor}
      },
      typography: {
        fontFamily: 'IRANSansPNumber, IRANSans',
      },
    }, faIR);
  }

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
    {props.children}
    </MuiThemeProvider>
  );
}