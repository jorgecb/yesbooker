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

interface Socio{
    nombre_socio?: string,
    email?: string,
    inserver?: boolean
}
const modalSocio = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let socio:Socio={};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Socio>(socio);
    const {nombre_socio ="" , email=""} = Data;
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    useEffect(() => {
        console.log(Data),
        console.log(Data.email)
    }, [Data])
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
        props.create({nombre_socio:Data.nombre_socio,email:Data.email,inserver:Data.inserver});
       // SocioDB.add();
        setOpen(false);
    };
    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Ingresar Socio
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Agregar Socio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Formulario para registro de Socios
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre_socio"
                    label="Nombre Socio"
                    type="text"
                    value={nombre_socio}
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