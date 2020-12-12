import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, lightGreen, yellow, grey } from '@material-ui/core/colors';
const drawerWidth = 240;

export const Style = makeStyles(theme => ({
  root: {
    '& .MuiBadge-badge': {
      fontFamily: 'IRANSansPNumber'
    },
  },
  title:{
    flexGrow: 1,
    display: 'block',
  },
  hideOnSm:{
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  showOnSm:{
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)!important`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `${drawerWidth}px!important`,
  },
  hide: {
    display: 'none',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionTabletAndUpper: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  notificationBadge:{
    margin: theme.spacing(1),
  },
  notificationTitle:{
    fontSize: 14,
    padding: theme.spacing(0.5),
    fontWeight: 400
  },
  menu:{
    '& .MuiMenu-paper':{
      border: 'none'
    }
  },
  btnMore:{
    padding: theme.spacing(1),
    borderRadius: 0,
    backgroundColor: `${theme.palette.type !== 'dark' ? grey[200] : grey['A400']}!important`,
  },
  avatar: {
    margin: 10,
  },
  orangeAvatar: {
    margin: 10,
    color: '#fff!important',
    backgroundColor: `${theme.palette.type !== 'dark' ? deepOrange[500] : deepOrange[900]}!important`,

  },
  purpleAvatar: {
    margin: 10,
    color: '#fff!important',
    backgroundColor: `${theme.palette.type !== 'dark' ? deepPurple[500] : deepPurple[900]}!important`,

  },
  lightGreenAvatar: {
    margin: 10,
    color: '#fff!important',
    backgroundColor: `${theme.palette.type !== 'dark' ? lightGreen[500] : lightGreen[900]}!important`,
     
  },
  yellowAvatar: {
    margin: 10,
    color: '#fff!important',
    backgroundColor: `${theme.palette.type !== 'dark' ? yellow[700] : yellow[900]}!important`,
  },
  textOverflow:{
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  messageUser:{
    fontSize: 14,
    fontWeight: 400,
  },
  messageDesc:{
    fontSize: 12,
    marginTop: theme.spacing(0.5),
    fontWeight: 300,
  },
  messageTime:{
    fontSize: 10,
    marginTop: theme.spacing(0.5),
    fontFamily: 'IRANSansPNumber',
    fontWeight: 400,
  },
}));