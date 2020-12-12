import React, { FC } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router} from "react-router-dom";
import { Auth, Main } from './layouts';
import { Store } from './store';

const App: FC = () => {
    const { state } = React.useContext<any>(Store.Context);
    const isAuthenticated = state.user.token === null ? false : true;
    document.body.setAttribute('dir','rtl');
    const paletteType: any = state.theme.paletteType;

    return (
        <Router>
            <Switch>
                <Route path="/auth" render={props => <Auth {...props} paletteType={paletteType} />}/>
                <Route path="/main" render={
                    props => (
                        isAuthenticated === true
                        ? <Main {...props} paletteType={paletteType} />
                        : <Redirect to='/auth/login' />
                    )
                }/>
                <Redirect from="/" to="/main/dashboard"/>
            </Switch>
    </Router>
    );
}

export default App;
