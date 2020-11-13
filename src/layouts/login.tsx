import React, { useReducer, useEffect, Component } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { Button, Card, CardActions, CardContent, Grid, TextField } from '@material-ui/core';
import carta from '../assets/img/carta.png'
import '../assets/css/App.css'
import Bg from '../assets/img/BGbACK.jpg';




const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100vh',
        },
        image: {
            backgroundImage: `url(${Bg})`,


            backgroundRepeat: 'no-repeat',
            backgroundColor:
                theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '50%',
            margin: `${theme.spacing(0)} auto`
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#212121',
            color: '#fff'
        },
        card: {
            marginTop: theme.spacing(10)
        }
    })
);


type State = {
    username: string
    password: string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};

const initialState: State = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

type Action = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return {
                ...state,
                isButtonDisabled: action.payload
            };
        case 'loginSuccess':
            return {
                ...state,

                helperText: action.payload,
                isError: false
            };
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}

const Alogin = () => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState);


    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }
    }, [state.username, state.password]);
    const baseurl ='http://reservasapi.yes-admin.com/index.php/Auth/login';

    var myHeaders = new Headers();
    myHeaders.append("API-key", "709cd00931492fef092b3430b64389016fe7eb4f");
    
/*     var formdata = new FormData();
    formdata.append("email", "hola@hotmail.com");
    formdata.append("password", "12345678"); */

    const handleLogin = async () => {
        const requestOptions = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
                email: state.username,
                password: state.password
            }) // body data type must match "Content-Type" header
  }

      
        


        console.log(requestOptions)
        const rawResponse = await fetch(baseurl, {
            method: 'POST',
            headers: {
                'X-API-KEY': 'apikey',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: state.username,
                password: state.password
            })
        })
        const content = await rawResponse.json()
        console.log(content)
        if (content.email === state.username) {
            localStorage.setItem('usuarios', JSON.stringify(content))
            window.location.href = "./admin";
        } else {
            dispatch({
                type: 'loginFailed',
                payload: 'Contraseña o Email Error'
            });
        }

    };



    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13 || event.which === 13) {
            state.isButtonDisabled || handleLogin();
        }
    };

    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        };

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        (event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        }
    return (
        <Grid className={classes.image} >




            <div className="body">



                <div id="form_wrapper">
                    <div id="form_left">
                        <img src={carta} alt="carta" />
                    </div>
                    <div id="form_right">
                        <h1>Yesbooker</h1>
                        <div className="input_container">
                            <i className="fas fa-envelope"></i>
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="username"
                                type="email"
                                label="Email"
                               
                                placeholder="Email"
                                variant="outlined"
                                helperText={state.helperText}
                                onChange={handleUsernameChange}
                                onKeyPress={handleKeyPress}
                            />
                        </div>

                        <div className="input_container">
                            <i className="fas fa-lock"></i>
                            <TextField
                                error={state.isError}
                                fullWidth
                                id="password"
                                label="Contraseña"
                                type="password"
                                autoComplete="current-password"
                                variant="outlined"
                                helperText={state.helperText}
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyPress}

                            />
                        </div>
                      {/*   <input type="submit" value="Login" id='input_submit' className='input_field' 
                         onClick={handleLogin}
                        disabled={state.isButtonDisabled}>

                         </input>
                       */}
                        <CardActions>
                           <Button
                                variant="contained"
                                size="large"
                                color="secondary"
                                className={classes.loginBtn}
                                onClick={handleLogin}
                                disabled={state.isButtonDisabled}>
                                Iniciar Sesison
          </Button> 
                        </CardActions>

                        <span>Recuperar  <a > Contraseña </a></span>
                        {/*   <span id='create_account'>
                    <a href="#">Create your account &#x27A1; </a>
                </span> */}
                    </div>
                </div>
            </div>

        </Grid>


/*  */);
}

export default Alogin;