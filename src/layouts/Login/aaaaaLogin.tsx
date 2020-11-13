import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import '../../assets/css/App.css';
import Carta from '../../assets/img/carta.png';

/* import Login from './aLogin';
 */


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://unsplash.com/photos/fyQr1T3GE34/download?force=true&w=2400)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(22, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {

  const classes = useStyles();

  return (
    <Grid className={classes.image} >
    
    {/*   <div className="wrapper fadeInDown">

        <div id="formContent">
          
        <div className="fadeIn first">
          <h3>Yesbooker</h3>
        </div>
          <img src={Carta} className='carta' />

          <Grid container component="main" className={classes.root}>
              <Login />

          </Grid>




        </div>
      </div> */}
    </Grid>

  );
}