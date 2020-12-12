import React from 'react';
import clsx from 'clsx';
import { Style } from '../style';
import { StyledMenu } from './styled-menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

interface MessageMenuProps {
  anchorEl: any;
  menuId: string;
  isOpen: boolean;
  handleMenuClose: any;
}
interface IMessageItem {
  avatarLetter: string;
  avatarClass: any;
  name: string;
  message: string;
  time: string;
}

export const MessageMenu: React.FC<MessageMenuProps> = (props) => {
  const classes = Style();

  const messages: Array<IMessageItem> = [
    {
      avatarLetter: 'BH',
      avatarClass: classes.yellowAvatar,
      name: 'بهرام',
      message: 'جالبه نه؟ خیلی جالبه',
      time: '1 دقیقه پیش',
    },
    {
      avatarLetter: 'AQ',
      avatarClass: classes.orangeAvatar,
      name: 'علی قاف',
      message: 'کار ما عین کاربنه، همه کپی می‌کنن',
      time: '10 دقیقه پیش',
    },
    {
      avatarLetter: 'BH',
      avatarClass: classes.yellowAvatar,
      name: 'بهرام',
      message: 'کار با متریالو از من بپرس',
      time: '20 دقیقه پیش',
    },
    {
      avatarLetter: 'MH',
      avatarClass: classes.purpleAvatar,
      name: 'مهراد هیدن',
      message: 'کج نمیره لاستیک، تا لق نزنه شاسی',
      time: '۴۵ دقیقه پیش',
    },
    {
      avatarLetter: 'RM',
      avatarClass: classes.lightGreenAvatar,
      name: 'رضا مارمولک',
      message: 'حالا برو کداتو بتکون!',
      time: '2 ساعت پیش',
    }
  ];
  
  return (
    <StyledMenu
      anchorEl={props.anchorEl}
      id={props.menuId}
      keepMounted
      open={props.isOpen}
      onClose={props.handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      className={classes.menu}
    >
      {messages.map((item, index) => (
        <MenuItem key={index}>
          <Avatar className={item.avatarClass}>{item.avatarLetter}</Avatar>
          <ListItemText>
            <Typography variant="subtitle1" display="block" align="left" className={classes.messageUser}>{item.name}</Typography>
            <Typography variant="subtitle2" display="block" color="textSecondary" className={clsx(classes.textOverflow, classes.messageDesc)} align="left">{item.message}</Typography>
            <Typography variant="caption" display="block" align="left" className={classes.messageTime}>{item.time}</Typography>
          </ListItemText>
        </MenuItem>
      ))}
      <Button fullWidth className={classes.btnMore}>مشاهده همه پیام ها</Button>
    </StyledMenu>
  );
}