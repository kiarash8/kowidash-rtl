import React, { FC, useEffect } from 'react';
import { Route, Switch, RouteComponentProps} from 'react-router-dom';
import routes from '../../routes';
import RTL from '../theme/rtl';
import Theme from '../theme/theme';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Store } from '../../store';
import { NavBar } from '../common/nav-bar';
import { SideBar } from '../common/side-bar';
import { GlobalStyle } from '../theme/global-style';
import { PaletteType } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  mainPadding: {
    padding: theme.spacing(3),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
    },
  },
}));

interface ILayout extends RouteComponentProps {
  paletteType: PaletteType;
}

export const Main: FC<ILayout> = (props) => {
    const classes = useStyles();
    const { state } = React.useContext(Store.Context);

    useEffect(() => {
      window.scrollTo(0, 0);
    },[props.location]);

    return (
        <RTL>
            <Theme paletteType={props.paletteType}>
                <div className={classes.root}>
                    <NavBar />
                    <SideBar />
                    <main
                    className={clsx(
                        classes.content,
                        classes.mainPadding,
                        {
                        [classes.contentShift]: state.general.drawer,
                        }
                    )}
                    >
                        <div className={classes.drawerHeader}></div>
                        <Switch>
                            {routes.map((item, key) => (
                                item.layout === "main" &&
                                <Route
                                    key={key}
                                    exact={true}
                                    path={`/${item.layout}${item.path}`}
                                    component={item.component}
                                />
                            ))}
                        </Switch>
                    </main>
                </div>
                <GlobalStyle />
            </Theme>
        </RTL>
    );
}