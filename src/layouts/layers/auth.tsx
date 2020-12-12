import React, { FC } from 'react';
import { Route, Switch, RouteComponentProps} from 'react-router-dom';
import routes from '../../routes';
import RTL from '../theme/rtl';
import Theme from '../theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { PaletteType } from '@material-ui/core';

interface ILayout extends RouteComponentProps {
    paletteType: PaletteType;
}

export const Auth: FC<ILayout> = (props) => {
  return (
    <RTL>
        <Theme paletteType={props.paletteType}>
            <CssBaseline />
            <Switch>
                {routes.map((item, key) => (
                    item.layout === "auth" ?
                    <Route
                        key={key}
                        exact={true}
                        path={`/${item.layout}${item.path}`}
                        component={item.component}
                    />
                    : null
                ))}
            </Switch>
        </Theme>
    </RTL>  
  );
}