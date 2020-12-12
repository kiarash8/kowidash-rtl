import { withStyles } from '@material-ui/core/styles';

export const GlobalStyle = withStyles({
    // @global is handled by jss-plugin-global.
    '@global': {
      '.MuiBadge-badge': {
        fontFamily: 'IRANSansPNumber',
      },
    },
})(() => null);