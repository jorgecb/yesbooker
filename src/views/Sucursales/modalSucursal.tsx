import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
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

interface Sucursal{
    nombre_sucursal?: string,
    direccion?: string,
    inserver?: boolean
}
const modalSocio = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let sucursal:Sucursal={nombre_sucursal:"" , direccion:""};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Sucursal>(sucursal);
    const re = useRef(null);
    const {nombre_sucursal, direccion} = Data;
    const valida=()=>{
        ValidatorForm.addValidationRule("isValidName",(valueSt)=>{
            let val:any = /[^ \.A-Za-z0-9_\-]/g.test(valueSt);
            if(val){
                return false;    
            }else{
                return true;}
            });
            /* ValidatorForm.addValidationRule("isValidName",(valueSt)=>/(^[ \w+])/g.test(valueSt)); */
    };
    const handleClickOpen = () => {
      setOpen(true);
      valida();
    };
    const handleClose = () => {
      setOpen(false);
    };
    /* useEffect(() => {
        console.log(Data)
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
        props.create({nombre_sucursal:Data.nombre_sucursal,direccion:Data.direccion,inserver:Data.inserver});
       
        setOpen(false);
        setData(sucursal);
    };
    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Ingresar Sucursal
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Agregar Sucursal</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Formulario para registro de Sucursales
                </DialogContentText>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre_sucursal"
                    label="Nombre Sucursal"
                    type="text"
                    onChange={handleChange}
                    value={nombre_sucursal}
                    validators={["required","isValidName"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales"]}
                    ref={re}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="direccion"
                    name="direccion"
                    label="Direccion"
                    type="email"
                    onChange={handleChange}
                    value={direccion}
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
  export default withStyles(styles)(modalSocio);