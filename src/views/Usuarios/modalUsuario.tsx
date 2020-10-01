import React, { FormEvent, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator} from "react-material-ui-form-validator";
const styles = createStyles({
    cardCategoryWhite: {
        '&,& a,& a:hover,& a:focus': {
            color: 'rgba(255,255,255,.62)',
            margin: '0',
            fontSize: '14px',
            marginTop: '0',
            marginBottom: '0'
        },
        '& a,& a:hover,& a:focus': {
            color: '#FFFFFF'
        }
    }
});
interface Usuario{
    nombre?: string,
    materno?: string,
    email?: string,
    inserver?: boolean
}
const modalUsuario = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let usuario:Usuario={nombre :"",materno :"" , email:""};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Usuario>(usuario);
    const {nombre, materno, email} = Data;
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };/* 
    useEffect(() => {
        console.log(Data),
        console.log(Data.email)
    }, [Data]) */
    const handleChange = (e: FormEvent<HTMLInputElement>,t:string) =>{
        setData({
            ...Data,
            [e.currentTarget.name]:e.currentTarget.value
        });
    };
    const handleSubmit =() =>{
        setData({
            ...Data,
            inserver:false
        });
        props.create({nombre:Data.nombre,materno:Data.materno,email:Data.email,inserver:Data.inserver});
        setOpen(false);
        setData(usuario);
    };
    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Ingresar Usuario
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Agregar Usuario</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Formulario para registro de Usuarios
                </DialogContentText>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre"
                    label="Nombre Usuario"
                    type="text"
                    onChange={handleChange}
                    value={nombre}
                    validators={["required"]}
                    errorMessages={["el campo es requerido"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="materno"
                    name="materno"
                    label="Apellido Materno"
                    type="text"
                    onChange={handleChange}
                    value={materno}
                    validators={["required"]}
                    errorMessages={["el campo es requerido"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="email"
                    name="email"
                    label="email"
                    type="email"
                    onChange={handleChange}
                    value={email}
                    validators={["required","isEmail"]}
                    errorMessages={["el campo es requerido","tiene que ser un formato de email valido"]}
                    fullWidth
                />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button type="submit" color="primary">
                    Registrar
                </Button>
            </DialogActions>
            </ValidatorForm>
            </DialogContent>
        </Dialog>
        </>
    );
  }
  export default withStyles(styles)(modalUsuario);