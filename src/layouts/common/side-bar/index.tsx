
import React, { FC } from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { SharedStyle } from './shared-style';
import { Store } from '../../../store';
import {Menu} from './menu';
import Typography from '@material-ui/core/Typography';
import { ReactComponent as Logo } from '../../../assets/images/logo_mini.svg';

export const SideBar: FC = () => {
    const { state, dispatch } = React.useContext(Store.Context);
    const classes = SharedStyle();

    return (
        <>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={state.general.drawer}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
            <div className={classes.drawerHeader}>
                <div className={classes.sideBarTitle}>
                    <Logo className={`${classes.logo} MuiSvgIcon-root`} />
                    <Typography className={classes.title} variant="h6">کُوی دَشـ</Typography>
                </div>
                <IconButton
                    onClick={() =>
                        Store.Set('general', {'drawer': false}, dispatch)
                    }>
                    {state.general.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <Menu />     
            </Drawer>
        </>
    );
}