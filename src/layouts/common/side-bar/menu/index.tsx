import React, { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Data, Imenu} from './data';
import { SharedStyle } from '../shared-style';
import Icon from '@material-ui/core/Icon';
import { Link as RouterLink } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export const Menu: FC = () => {
    const classes = SharedStyle();
    const location = window.location.pathname.split('/');
    const activeMenu = (location.length > 2 ? location[2] : '');

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
                    className={`${ activeMenu === item.id ? classes.activeListItem : ''}`}
                    button
                    component={RouterLink}
                    to={item.state}>
                    <ListItemIcon className={classes.listItemIconContainer}>
                        <Icon className={classes.listItemIcon}>{item.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText className={`${classes.listItemText} ${ activeMenu === item.id ? classes.activeListItemText : ''}`} primary={item.caption} />
                </ListItem>
                : <SubMenu key={index} item={item} />
            ))}
        </List>
    );
}


const SubMenu: FC<{item: Imenu}> = ({ item }) => {
    const classes = SharedStyle();
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const location = window.location.pathname.split('/');
    const activeMenu = (location.length > 2 ? location[2] : '');
    const activeSubMenu = (location.length > 3 ? location[3] : '');

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
                        className={`${classes.nested} ${ activeMenu === item.id && activeSubMenu === el.id ? classes.activeListItem : ''}`}
                        component={RouterLink}
                        to={el.state}>
                    <ListItemText
                        className={`${classes.listItemText}
                        ${ activeMenu === item.id && activeSubMenu === el.id ? classes.activeListItemText : ''}`}
                        primary={el.caption} />
                    </ListItem>
                    : <SubMenuBeta key={index} item={el} />
                ))}
            </List>
            }
        </Collapse>
      </>
    );
}

const SubMenuBeta: FC<{item: Imenu}> = ({ item }) => {
    const classes = SharedStyle();
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);
    const location = window.location.pathname.split('/');
    const activeSubMenu = (location.length > 3 ? location[3] : '');
    const activeBetaSubMenu = (location.length > 4 ? location[4] : '');

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
                        className={`${classes.nestedBeta} ${ activeSubMenu === item.id && activeBetaSubMenu === el.id ? classes.activeListItem : ''}`}
                        component={RouterLink}
                        to={el.state}>
                    <ListItemText
                        className={`${classes.listItemText}
                        ${ activeSubMenu === item.id && activeBetaSubMenu === el.id ? classes.activeListItemText : ''}`}
                        primary={el.caption} />
                    </ListItem>
                ))}
            </List>
            }
        </Collapse>
      </>
    );
}