import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface UserMenuProps {
  anchorEl: any;
  menuId: string;
  isOpen: boolean;
  handleMenuClose: any;
  logout: any;
}

export const UserMenu: React.FC<UserMenuProps> = (props) => {

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
            <MenuItem onClick={props.logout}>خروج</MenuItem>
        </Menu>
    );
}