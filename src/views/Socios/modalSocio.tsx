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

interface Socio{
    nombre_socio?: string,
    email?: string,
    inserver?: boolean
}
const modalSocio = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let socio:Socio={nombre_socio:"" , email:"",inserver:false};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Socio>(socio);
    const [upd,setUpd] =useState(false);
    const {nombre_socio, email} = Data;
    const handleClickOpen = () => {
      setOpen(true);
      valida();
    };
    const handleClickOpen2 = () => {
        console.log(props.update.data.nombre_socio);
        setUpd(true);
        valida();
        const val:any =(props.update.chPas != false)?setOpen(true):alert("solo se puede actualizar un registro");
        return val;
      };
    const handleUpd=()=>{
        const dot:any =(upd !== true)?props.update.data.nombre_socio:"";
        return dot;
    }
    const handleClose = () => {
      setOpen(false);
    };
    const valida=()=>{
        ValidatorForm.addValidationRule("isValidName",(valueSt)=>{
            let val:any = /[^ \.A-Za-z0-9_\-]/g.test(valueSt.trim());
            if(val){
                return false;    
            }else{
                return true;}
            });
        ValidatorForm.addValidationRule("notFT",(valueSt)=>{
            let val:any = /(false|true|FALSE|TRUE)/g.test(valueSt.trim());
            if(val){
                return false;    
            }else{
                return true;}
        });
            /* ValidatorForm.addValidationRule("isValidName",(valueSt)=>/(^[ \w+])/g.test(valueSt)); */
    };
/*     useEffect(() => {
        console.log(Data),
        console.log(Data.email)
    }, [Data])*/
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
        props.create({nombre_socio:Data.nombre_socio,email:Data.email,inserver:Data.inserver});
        setOpen(false);
        setData(socio);
    };
    return (
        <div>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Ingresar Socio
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
            Actualizar Socio
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Agregar Socio</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Formulario para registro de Socios
                </DialogContentText>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre_socio"
                    label="Nombre Socio"
                    type="text"
                    onChange={handleChange}
                    deafultValue={handleUpd}
                    value={nombre_socio}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
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
        </div>
    );
  }
  export default withStyles(styles)(modalSocio);