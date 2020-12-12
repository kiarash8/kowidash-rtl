import React from 'react';
import clsx from 'clsx';
import { Style } from '../style';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface MobileMenuProps {
  anchorEl: any;
  menuId: string;
  isOpen: boolean;
  handleMenuClose: any;
  logout: any;
}

export const MobileMenu: React.FC<MobileMenuProps> = (props) => {
    const classes = Style();

    return (
        <Menu
            anchorEl={props.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={props.menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.isOpen}
            onClose={props.handleMenuClose}
        >
            <MenuItem>اطلاعات کاربری</MenuItem>
            <MenuItem>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Grid item>
                        <Typography display="block" className={clsx(classes.textOverflow, classes.notificationTitle)}>پیغام</Typography>
                    </Grid>
                    <Grid item>
                        <Badge className={classes.notificationBadge} badgeContent={5} color="secondary"> </Badge>
                    </Grid>
                </Grid>
            </MenuItem>
            <MenuItem>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Grid item>
                        <Typography display="block" className={clsx(classes.textOverflow, classes.notificationTitle)}>اعلان</Typography>
                    </Grid>
                    <Grid item>
                        <Badge className={classes.notificationBadge} badgeContent={20} color="secondary"> </Badge>
                    </Grid>
                </Grid>
            </MenuItem>
            <MenuItem onClick={props.logout}>خروج</MenuItem>
        </Menu>
    );
}