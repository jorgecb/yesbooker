import React, { FormEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
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
interface Zona{
    nombre_zona?: string,
    descripcion?: string,
    deleted?:boolean,
    inserver?: boolean,
}
const modalZonas= (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let zonas:Zona={nombre_zona :"",descripcion :"" , deleted:false, inserver:false};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Zona>(zonas);
    const {nombre_zona, descripcion,inserver} = Data;
    const [intfz,setIntfz] = useState({
        ttl:"Resgistro de zona",
        bt:"Registrar",
    });
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
            
    };
    const handleClickOpen = () => {
        if(Object.keys(props.update.data).length!==0){
            return alert("no se puede registrar mientras existan elementos selecionados");
        };
      setOpen(true);
      valida();
    };
    const handleClickOpen2 = () => {
        if(props.update.chPas === false){
            return alert("debes elegir sólo un(1) campo a la vez");
        };
        setData({
           nombre_zona:props.update.data.nombre_zona,
           descripcion:props.update.data.descripcion,
        });
        setIntfz({ttl:"Actualizar zona",
                    bt:"Actualizar",
        });
        setOpen(true);
        valida();
        
      };
    const handleClose = () => {
        setData(zonas);
        setIntfz({
            ttl:"Resgistro de zona",
            bt:"Registrar",
        });
      setOpen(false);
    };
    const handleChange = (e: FormEvent<HTMLInputElement>,t:string) =>{
      e.preventDefault();
        setData({
            ...Data,
            [e.currentTarget.name]:e.currentTarget.value
        });
    };
    const handleSubmit =(e:any) =>{
      e.preventDefault();
        setData({
            ...Data,
            deleted:false,
            inserver:false,
        });
        if(props.update.chPas===true){
            props.upd({id:props.update.data.id, zon:{nombre_zona:Data.nombre_zona,descripcion:Data.descripcion,deleted:false,inserver:false}});
            setOpen(false);
            setData(zonas);
            setIntfz({
                ttl:"Resgistro de zona",
                bt:"Registrar",
            });
            return;
        };
        props.create({nombre_zona:Data.nombre_zona,descripcion:Data.descripcion,deleted:Data.deleted,inserver:Data.inserver});
        setOpen(false);
        setData(zonas);
        return;
    };
    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Ingresar zona
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
            Actualizar zona
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{intfz.ttl.toString()}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Formulario de zonas
                </DialogContentText>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre"
                    label="Nombre zona"
                    type="text"
                    onChange={handleChange}
                    value={nombre_zona}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="descripcion"
                    name="descripcion"
                    label="descripcion de zona"
                    type="text"
                    onChange={handleChange}
                    value={descripcion}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancelar
                </Button>
                <Button type="submit" color="primary">
                    {intfz.bt}
                </Button>
            </DialogActions>
            </ValidatorForm>
            </DialogContent>
        </Dialog>
        </>
    );
  }
  export default withStyles(styles)(modalZonas);