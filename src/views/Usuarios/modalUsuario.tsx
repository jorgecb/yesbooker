import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
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
const modalSocio = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let usuario:Usuario={};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Usuario>(usuario);
    const {nombre ="",materno ="" , email=""} = Data;
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
    const handleChange = (e: { target: { name: any; value: any; }; }) =>{
        setData({
            ...Data,
            [e.target.name]:e.target.value
        });
    };
    const handleSubmit =() =>{
        setData({
            ...Data,
            inserver:false
        });
        props.create({nombre:Data.nombre,materno:Data.materno,email:Data.email,inserver:Data.inserver});
        setOpen(false);
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
                    Formulario para registro de usuarios
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre"
                    label="Nombre Usuario"
                    type="text"
                    value={nombre}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    name="materno"
                    label="Apellido Materno"
                    type="text"
                    value={materno}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Registrar
                </Button>
            </DialogActions>
        </Dialog>
        </>
    );
  }
  export default withStyles(styles)(modalSocio);