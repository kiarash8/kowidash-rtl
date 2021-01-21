import React, { FC, useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Data, Imenu} from './data';
import { SharedStyle } from '../shared-style';
import Icon from '@material-ui/core/Icon';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom'; 
import Routes from '../../../../routes';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export const Menu: FC = () => {
    const classes = SharedStyle();
    const location = useLocation();
    const [active, setActive] = useState({
      id: '',
      menu: '',
      subMenu: ''
    });

    useEffect(() => {
      const routeList = Routes.filter(x=> x.layout === 'main').map(x=> `/${x.layout}${x.path}`);
      const match = matchPath(location.pathname, {
        path: routeList
      })
      if(match){
        const currentRoute = Routes.find(x=> x.path == match.path.replace('/main', ''));
        if(currentRoute) {
          const menuSplit = currentRoute.id.toString().split('_');
          setActive({
            id: currentRoute.id,
            menu: menuSplit.length >= 2 ? menuSplit[0] : '',
            subMenu: menuSplit.length === 3 ? menuSplit[1] : ''
          });
        }
      }
    }, [location]);

    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.list}
        >
            {Data.map((item, index) => (
                item.type === 'link' ? 
                <ListItem
                    key={index}
                    className={`${ active.id === item.id ? classes.activeListItem : ''}`}
                    button
                    component={RouterLink}
                    to={item.state}>
                    <ListItemIcon className={classes.listItemIconContainer}>
                        <Icon className={classes.listItemIcon}>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText className={`${classes.listItemText} ${ active.id === item.id ? classes.activeListItemText : ''}`} primary={item.caption} />
                </ListItem>
                : <SubMenu
                    key={index}
                    item={item}
                    activeId={active.id}
                    activeMenu={active.menu}
                    activeSubMenu={active.subMenu} />
            ))}
        </List>
    );
}

const SubMenu: FC<{
  item: Imenu,
  activeId: string,
  activeMenu: string,
  activeSubMenu: string}> = ({ item, activeId, activeMenu, activeSubMenu }) => {
    const classes = SharedStyle();
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(activeMenu === item.id && !load){
          setOpen(true);
          setLoad(true);
        }
      },[activeMenu, item.id, open, load]);
  
      function handleClick() {
        setOpen(!open);
      }

    return (
        <>
        <ListItem
          button
          onClick={handleClick}>
          <ListItemIcon className={classes.listItemIconContainer}>
            <Icon className={classes.listItemIcon}>{item.icon}</Icon>
          </ListItemIcon>
          <ListItemText className={`${classes.listItemText} ${ activeMenu === item.id ? classes.activeListItemText : ''}`} primary={item.caption} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            {item.children !== undefined &&            
            <List component="div" disablePadding>
                {item.children.map((el, index) => (
                    el.type === 'link' ? 
                    <ListItem
                        key={index}
                        button
                        className={`${classes.nested} ${ activeMenu === item.id && activeId === el.id ? classes.activeListItem : ''}`}
                        component={RouterLink}
                        to={el.state}>
                    <ListItemText
                        className={`${classes.listItemText}
                        ${ activeMenu === item.id && activeId === el.id ? classes.activeListItemText : ''}`}
                        primary={el.caption} />
                    </ListItem>
                    : <SubMenuBeta
                        key={index}
                        item={el} 
                        activeId={activeId}
                        activeSubMenu={activeSubMenu} />
                ))}
            </List>
            }
        </Collapse>
      </>
    );
}

const SubMenuBeta: FC<{
  item: Imenu,
  activeId: string,
  activeSubMenu: string
}> = ({ item, activeId, activeSubMenu }) => {
    const classes = SharedStyle();
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(activeSubMenu === item.id && !load){
          setOpen(true);
          setLoad(true);
        }
      },[activeSubMenu, item.id, open, load]);
  
      function handleClick() {
        setOpen(!open);
      }

    return (
        <>
        <ListItem
          button
          className={classes.nested}
          onClick={handleClick}>
          <ListItemText className={`${classes.listItemText} ${ activeSubMenu === item.id ? classes.activeListItemText : ''}`} primary={item.caption} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            {item.children !== undefined &&            
            <List component="div" disablePadding>
                {item.children.map((el, index) => (
                    <ListItem
                        key={index}
                        button
                        className={`${classes.nestedBeta} ${ activeSubMenu === item.id && activeId === el.id ? classes.activeListItem : ''}`}
                        component={RouterLink}
                        to={el.state}>
                    <ListItemText
                        className={`${classes.listItemText}
                        ${ activeSubMenu === item.id && activeId === el.id ? classes.activeListItemText : ''}`}
                        primary={el.caption} />
                    </ListItem>
                ))}
            </List>
            }
        </Collapse>
      </>
    );
}
