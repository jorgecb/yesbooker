import React, { useReducer, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import profile from '../../assets/img/profile.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
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

const Registro = () => {
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
    const baseurl = 'http://localhost/reservas4/public/index.php/usuario/index_post';

    
    const handleLogin = async () => {
        const rawResponse = await fetch(baseurl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            mode: 'cors',
            body: JSON.stringify({
                email: state.username,
                password: state.password
            }),
        });
        const content = await rawResponse.json();
        console.log(rawResponse);
        console.log(content);
    }; 

    /* 
         const handleLogin = async () => {
            await Axios.post(baseurl, { params: { username: state.username, password: state.password } })
    
                .then(Responde => {
                    console.log(Responde.data);
                })
                .catch(error => {
                    console.log(error)
                })
        }  */


    /* const handleLogin = () => {
      if (state.username === 'abc@email.com' && state.password === 'password') {
          console.log
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully'
        });
      } else {
        dispatch({
          type: 'loginFailed',
          payload: 'Incorrect username or password'
        });
      }
    };  */

    /*   const handleLogin = () => {
        if (state.username === 'abc@email.com' && state.password === 'password') {
          dispatch({
            type: 'loginSuccess',
            payload: 'Login Successfully'
          });
        } else {
          dispatch({
            type: 'loginFailed',
            payload: 'Incorrect username or password'
          });
        }
      }; */

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
        <div>
            <img src={profile} id="icon" />
            <form noValidate autoComplete="off">
                <TextField
                    error={state.isError}
                    id="Nombre"
                    type="email"
                    label="Nombre"
                    placeholder="Nombre"
                    onChange={handleUsernameChange}
                    onKeyPress={handleKeyPress}
                    className="fadeIn second"
                />
                <TextField
                    error={state.isError}
                    id="Apellido"
                    type="email"
                    label="Apellido"
                    placeholder="Apellido"
                    className="fadeIn second"
                    helperText={state.helperText}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                />
                <TextField
                    fullWidth
                    error={state.isError}
                    id="username"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    className="fadeIn second"
                    helperText={state.helperText}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                />
                <TextField
                    fullWidth
                    error={state.isError}
                    id="password"
                    type="password"
                    label="Contraseña"
                    placeholder="Contraseña"
                    className="fadeIn second"
                    helperText={state.helperText}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                />
                <Button
                    className="fadeIn second"

                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={handleLogin}
                    disabled={state.isButtonDisabled}>
                    Registrar
                 </Button>
            </form>
        </div>

    );
}

export default Registro;