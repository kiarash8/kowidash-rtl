import React, { FC, useEffect } from 'react';
import { Data } from '../side-bar/menu/data';
import { Store } from '../../../store';
import clsx from 'clsx';
import { Style } from './style';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { MessageMenu, NotificationMenu, UserMenu, MobileMenu } from './menu';
import { Search } from './search';
import { useLocation, matchPath } from 'react-router-dom'; 
import { useTheme } from '@material-ui/core/styles';
import {Brightness4, Brightness7} from '@material-ui/icons';
import Routes from '../../../routes';

export const NavBar: FC = () => {
  const defaultTheme = useTheme();
  const classes = Style();
  const location = useLocation();
  const { state, dispatch } = React.useContext(Store.Context);
  const [pageTitle, setPageTitle] = React.useState('');

  // set page title from match path
  useEffect(() => {
    const routeList = Routes.filter(x=> x.layout === 'main').map(x=> `/${x.layout}${x.path}`);
    const match = matchPath(location.pathname, {
      path: routeList
    })
    if(match){
      const currentRoute = Routes.find(x=> x.path == match.path.replace('/main', ''));
      if(currentRoute) {
        setPageTitle(currentRoute.title);
      }
    }
    else{
      setPageTitle('');
    }
  }, [location]);

  // user-menu
  const userMenuId = 'user-menu';
  const [userAnchorEl, setUserAnchorEl] = React.useState(null);
  const isUserMenuOpen = Boolean(userAnchorEl);
  const handleUserMenuOpen = (event:any) => { setUserAnchorEl(event.currentTarget) }
  const handleUserMenuClose = () => { setUserAnchorEl(null) }

  // notification-menu
  const notificationMenuId = 'notification-menu';
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);
  const handleNotificationMenuOpen = (event:any) => { setNotificationAnchorEl(event.currentTarget) }
  const handleNotificationMenuClose = () => { setNotificationAnchorEl(null) }

  // message-menu
  const messageMenuId = 'message-menu';
  const [messageAnchorEl, setMessageAnchorEl] = React.useState(null);
  const isMessageMenuOpen = Boolean(messageAnchorEl);
  const handleMessageMenuOpen = (event:any) => { setMessageAnchorEl(event.currentTarget) }
  const handleMessageMenuClose = () => { setMessageAnchorEl(null) }

  // mobile-menu
  const mobileMenuId = 'mobile-menu';
  const [mobileAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileAnchorEl);
  const handleMobileMenuOpen = (event:any) => { setMobileMoreAnchorEl(event.currentTarget) }
  const handleMobileMenuClose = () => { setMobileMoreAnchorEl(null) }


  const Logout = () => {
      Store.Reset('user', dispatch);
      handleUserMenuClose();
  }

  const changeTheme = () => {
    Store.Set('theme', {'paletteType': state.theme.paletteType === 'light' ? 'dark' : 'light' }, dispatch)
  }

  return (
      <>
      <AppBar
        position="fixed"
        color={defaultTheme.palette.type === 'dark' ? 'default' : 'primary'}
        className={clsx(classes.appBar, {
        [classes.appBarShift]: state.general.drawer,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={`${state.general.drawer && classes.hide}`}
            onClick={() =>
              Store.Set('general', {'drawer': true}, dispatch)
            }
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={clsx(classes.title,{
            [classes.textOverflow]: state.general.drawer,
          })} variant="body2">{pageTitle}</Typography>
          <div className={classes.sectionTabletAndUpper}>
            <Search />
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              onClick={changeTheme}
              color="inherit">
                {state.theme.paletteType === 'light' ?              
                  <Brightness4 />
                :
                  <Brightness7 />
                }
            </IconButton>
            <IconButton
              aria-controls={messageMenuId}
              aria-haspopup="true"
              onClick={handleMessageMenuOpen}
              color="inherit">
              <Badge badgeContent={5} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-controls={notificationMenuId}
              aria-haspopup="true"
              onClick={handleNotificationMenuOpen}
              color="inherit">
              <Badge badgeContent={20} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-controls={userMenuId}
              aria-haspopup="true"
              onClick={handleUserMenuOpen}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <div className={clsx({[classes.hideOnSm]: state.general.drawer})}>
              <IconButton
                  className={classes.showOnSm}
                  aria-label="Search"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <SearchIcon />
              </IconButton>
            </div>
            <div className={clsx({[classes.hideOnSm]: state.general.drawer})}>
              <IconButton
                onClick={changeTheme}
                color="inherit">
                  {state.theme.paletteType === 'light' ?              
                    <Brightness4 />
                  :
                    <Brightness7 />
                  }
              </IconButton>
            </div>
            <div className={clsx({[classes.hideOnSm]: state.general.drawer})}>
              <IconButton
                aria-label="Show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <MobileMenu
        anchorEl={mobileAnchorEl}
        menuId={mobileMenuId}
        isOpen={isMobileMenuOpen}
        handleMenuClose={handleMobileMenuClose}
        logout={Logout} />
      <UserMenu
        anchorEl={userAnchorEl}
        menuId={userMenuId}
        isOpen={isUserMenuOpen}
        handleMenuClose={handleUserMenuClose}
        logout={Logout} />
      <NotificationMenu
        anchorEl={notificationAnchorEl}
        menuId={notificationMenuId}
        isOpen={isNotificationMenuOpen}
        handleMenuClose={handleNotificationMenuClose} />
      <MessageMenu
        anchorEl={messageAnchorEl}
        menuId={messageMenuId}
        isOpen={isMessageMenuOpen}
        handleMenuClose={handleMessageMenuClose} />
      </>
  );
}