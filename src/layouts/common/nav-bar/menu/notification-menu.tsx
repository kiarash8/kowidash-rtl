import React from 'react';
import clsx from 'clsx';
import { Style } from '../style';
import { StyledMenu } from './styled-menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';

interface NotificationMenuProps {
  anchorEl: any;
  menuId: string;
  isOpen: boolean;
  handleMenuClose: any;
}

export const NotificationMenu: React.FC<NotificationMenuProps> = (props) => {
  const classes = Style();

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
     <MenuItem>
      <ListItemText>
        <Typography variant="subtitle1" align="left">
        <Grid container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="flex-start">
            <Grid item xs={8}>
                <Typography variant="subtitle1" display="block" className={clsx(classes.textOverflow, classes.notificationTitle)}>یادآوری</Typography>
            </Grid>
            <Grid item>
              <Badge className={classes.notificationBadge} badgeContent={10} color="secondary"> </Badge>
            </Grid>
          </Grid>
        </Typography>
      </ListItemText>
    </MenuItem>
    <MenuItem>
      <ListItemText>
        <Typography variant="subtitle1" align="left">
          <Grid container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="flex-start">
              <Grid item xs={8}>
              <span className={clsx(classes.textOverflow, classes.notificationTitle)}>کارهای روزانه</span>
              </Grid>
              <Grid item>
              <Badge className={classes.notificationBadge} badgeContent={5} color="primary"> </Badge>
              </Grid>
          </Grid>
        </Typography>
      </ListItemText>
    </MenuItem>
    <MenuItem>
      <ListItemText>
        <Typography variant="subtitle1" align="left">
        <Grid container
            spacing={2}
            direction="row"
            justify="space-between"
            alignItems="flex-start">
              <Grid item xs={8}>
              <span className={clsx(classes.textOverflow, classes.notificationTitle)}>در انتظار تایید</span>
              </Grid>
              <Grid item>
              <Badge className={classes.notificationBadge} badgeContent={5} color="error"> </Badge>
              </Grid>
          </Grid>
        </Typography>
      </ListItemText>
    </MenuItem>
    <Button fullWidth className={classes.btnMore}>مشاهده همه اعلان ها</Button>
  </StyledMenu>
  );
}