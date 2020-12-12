import React, { useContext, useState } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import { Store } from '../../store';
import clsx from 'clsx';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {CircularProgress, Box, Card, CardContent, Button, Grid, Typography, InputLabel, OutlinedInput, InputAdornment, IconButton, Collapse } from '@material-ui/core';
import {AccountCircle, Lock, Visibility, VisibilityOff, Close } from '@material-ui/icons';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import Alert, {Color} from '@material-ui/lab/Alert';

export function useRouter() {
  return useContext(RouterContext);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logo:{
      width: '128px',
      height: '64px'
    },
    card: {
      maxWidth: '400px',
      marginTop: '48px',
      margin: '0 auto',
      [theme.breakpoints.down('sm')]: {
        boxShadow: 'none',
        backgroundColor: 'transparent'
      },
    },
    header:{
      textAlign: 'center',
      marginBottom: theme.spacing(3)
    },
    title:{
      fontSize: '1.4rem',
      fontWeight: 600,
      color: theme.palette.type !== 'dark' ? theme.palette.primary.main : theme.palette.primary.contrastText,
    },
    subtitle:{
      fontSize: '.8rem',
      fontWeight: 400,
    },
    cardContent: {
      paddingBottom:'8px!important'
    },
    cardAction:{
      margin: theme.spacing(1,0),
    },
    button: {
      padding: theme.spacing(1.5),
    },
    alert:{
      marginTop: theme.spacing(1)
    },
    inputLabel:{
      fontSize: '0.8125rem',
      textAlign: 'left',
      paddingBottom: theme.spacing(1.5)
    },
    textField: {
      flexBasis: 200,
      marginBottom:theme.spacing(3),
    },
    loading: {
      width: '22px!important',
      height: '22px!important',
    }
  }),
);  

const Login: React.FC = () => {
  const classes = useStyles();
  const { history } = useRouter();
  const { dispatch } = React.useContext(Store.Context);

  const [fields, setFields] = useState({
    username:{
      value: '',
      validation:false
    },
    password:{
      value: '',
      validation:false
    },
  });
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [alert, setAlert] = useState<{ 
    show: boolean;
    message: string;
    severity: Color;
  }>({
    show: false,
    message: '',
    severity: 'warning'
  });

  const handleFieldChange = (name:string, event:any) => {
    setFields({
        ...fields,
        [name]: {
            value: event.target.value,
            validation: false
        }
    });
  };

  const handleClickShowPassword = () => { setShowPassword(!showPassword) };
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault() };


  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if(fields.username.value === 'admin' && fields.password.value === 'admin'){
        Store.Set('user', {token: '#token', name: 'kia'}, dispatch);
        history.push('/main/dashboard')
        window.location.reload();
      }
      else{
        setAlert({
          show: true,
          message: 'اطلاعات وارد شده صحیح نیست!',
          severity: 'warning'
        })
        setFields({
          username: {
              ...fields.username,
              validation: true
          },
          password: {
            ...fields.password,
            validation: true
        }
      });
      }
    }, 2000);
  }

  return (
    <Box justifyContent="center">
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
                <div className={classes.header}>
                  <Logo className={`${classes.logo} MuiSvgIcon-root`} />
                  <Typography className={classes.title} component="h2" gutterBottom>کُوی دَشـ</Typography>
                  <Typography className={classes.subtitle} component="small" gutterBottom>ورود به حساب کاربری</Typography>
                </div>
                  <InputLabel className={classes.inputLabel}>نام کاربری</InputLabel>
                  <OutlinedInput
                    fullWidth
                    className={clsx(classes.textField)}
                    value={fields.username.value}
                    placeholder="نام کاربری admin"
                    onChange={e => handleFieldChange('username', e)}
                    error={fields.username.validation}
                    startAdornment={<InputAdornment position="start"><AccountCircle color="action" /></InputAdornment>}
                />
                  <InputLabel className={classes.inputLabel}>رمز عبور</InputLabel>
                  <OutlinedInput
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    className={clsx(classes.textField)}
                    value={fields.password.value}
                    placeholder="رمز عبور admin"
                    onChange={e => handleFieldChange('password', e)}
                    error={fields.password.validation}
                    startAdornment={<InputAdornment position="start"><Lock color="action" /></InputAdornment>}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                />
                <Grid className={classes.cardAction} container>
                  <Grid item xs={12}>
                    <Button
                      onClick={() => login()}
                      disabled={fields.username.value === '' || fields.password.value === '' || loading === true}
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="small">
                        {loading ?
                          <CircularProgress
                          color="inherit"
                          className={classes.loading} /> : 'ورود'}
                      </Button>
                  </Grid>
                  <Grid item xs={12}>
                  <Collapse in={alert.show}>
                    <Alert
                      className={classes.alert}
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setAlert({
                              ...alert,
                              show: false
                            })
                          }}
                        >
                          <Close fontSize="inherit" />
                        </IconButton>
                      }
                    severity={alert.severity}>{alert.message}</Alert>
                  </Collapse>
                  </Grid>
                </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;