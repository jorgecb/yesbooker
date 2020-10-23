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
 
interface Sucursal{
    nombre_sucursal?: string,
    direccion?: string,
    deleted?:boolean,
    inserver?: boolean,
}
const modalSocio = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let sucursal:Sucursal={nombre_sucursal:"" , direccion:"", deleted:false, inserver:false};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Sucursal>(sucursal);
    const {nombre_sucursal, direccion, inserver} = Data;
    const [intfz,setIntfz] = useState({
        ttl:"Resgistro de Sucursales",
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
            /* ValidatorForm.addValidationRule("isValidName",(valueSt)=>/(^[ \w+])/g.test(valueSt)); */
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
            nombre_sucursal:props.update.data.nombre_sucursal,
            direccion:props.update.data.direccion,
        });
        setIntfz({ttl:"Actualizar Sucursal",bt:"Actualizar"});
        valida();
        setOpen(true);
      };
    const handleClose = () => {
      setData(sucursal);
      setIntfz({
          ttl:"Resgistro de Sucursales",
          bt:"Registrar",
      });
      setOpen(false);
    };
    /* useEffect(() => {
        console.log(Data)
    }, [Data]) */
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
            props.upd({id:props.update.data.id, suc:{nombre_socio:Data.nombre_sucursal,direccion:Data.direccion,deleted:false,inserver:false}});
            setOpen(false);
            setData(sucursal);
            setIntfz({
                ttl:"Resgistro de Sucursales",
                bt:"Registrar",
            });
            return;
        };
        props.create({nombre_sucursal:Data.nombre_sucursal,direccion:Data.direccion,deleted:Data.deleted,inserver:Data.inserver});
        setOpen(false);
        setData(sucursal);
        return;
    };
    return (
        <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Ingresar Sucursal
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
            Actualizar Sucursal
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{intfz.ttl.toString()}</DialogTitle>
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
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
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
                    {intfz.bt}
                </Button>
            </DialogActions>
            </ValidatorForm>
            </DialogContent>
        </Dialog>
        </>
    );
  }
  export default withStyles(styles)(modalSocio);