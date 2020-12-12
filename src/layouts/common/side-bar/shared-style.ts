import { makeStyles } from '@material-ui/core/styles';
const drawerWidth = 240;

export const SharedStyle = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.paper,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  sideBarTitle:{
    flexGrow: 1,
    paddingLeft: theme.spacing(1)
  },
  logo: {
    marginRight:theme.spacing(1),
    height:24,
    fill:theme.palette.primary.main
  },
  title:{
    display: 'inline-block',
    verticalAlign: 'super',
    color: theme.palette.type !== 'dark' ? theme.palette.primary.dark : 'inherit',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    paddingTop: '0px!important',
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
  },
  nestedBeta: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(2),
  },
  listItemText:{
    textAlign:"left",
    '& .MuiTypography-body1':{
      fontWeight: '300'
    }
  },
  activeListItemText:{
    color: theme.palette.type !== 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
    '& .MuiTypography-body1':{
      fontWeight: '500!important'
    }
  },
  activeListItem: {
    borderRight: `solid 3px ${theme.palette.type !== 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light}`
  },
  listItemIconContainer:{
    minWidth: '32px!important'
  },
  listItemIcon:{
    color: theme.palette.type !== 'dark' ? theme.palette.primary.dark : 'inherit'
  },
}));
