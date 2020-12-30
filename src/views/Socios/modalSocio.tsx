import React, { FormEvent, useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, FormControl, FormHelperText, makeStyles, MenuItem, Select } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {App} from '../Usuarios/formImg';
import classNames from 'classnames';
import { Theme } from '@material-ui/core/styles';
const styles = createStyles({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
});
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
interface Socio{
    nombre_socio?: string,
    nombre_contacto?: string,
    email?: string,
    telefono?: string,
    clabe?: string,
    beneficiario?: string,
    cuota?: string,
    notas?: string,
    img64?: string,
    fecha_modifica?: Date,
    fecha_agrega?: Date,
    deleted?:boolean,
    inserver?: boolean
}
const modalSocio = (props:any) =>{
    const classes = useStyles();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const reference = useRef(); 
    let socio:Socio={
        nombre_socio:"" ,
        email:"",
        nombre_contacto:"",
        telefono: "",
        clabe: "",
        beneficiario: "",
        cuota: "",
        notas: "",
        img64: "",
        fecha_modifica:  new Date(),
        fecha_agrega: new Date(),
        deleted:false, 
        inserver:false};
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState<Socio>(socio);
    const {nombre_socio, email, nombre_contacto, telefono, clabe, beneficiario, cuota, notas, fecha_agrega, fecha_modifica} = Data;
    const [intfz,setIntfz] = useState({
        ttl:"Resgistro de Socios",
        bt:"Registrar",
    });
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
            nombre_socio:props.update.data.nombre_socio,
            email:props.update.data.email,
        });
        setIntfz({ttl:"Actualizar Socio",bt:"Actualizar"});
        valida();
        const val:any =(props.update.chPas != false)?setOpen(true):alert("solo se puede actualizar un registro");
        return val;
      };
    const handleClose = () => {
        setData(socio);
        setIntfz({
               ttl:"Resgistro de Socios",
            bt:"Registrar",
        });
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
        ValidatorForm.addValidationRule("isValidTelephone",(valueSt)=>{
            let val:any = /[^ \.0-9_+() \-]/g.test(valueSt.trim());
            let phrase:string = valueSt.trim();
            if(val || phrase.length < 10 || phrase.length > 15){
                return false;    
            }else{
                return true;}
        });
        ValidatorForm.addValidationRule("isValidClabe",(valueSt)=>{
            let val:any = /[^ 0-9 ]/g.test(valueSt.trim());
            let phrase:string = valueSt.trim();
            if(val || phrase.length !== 18){
                return false;    
            }else{
                return true;}
        });
        ValidatorForm.addValidationRule("isValidNote",(valueSt)=>{
            let val:any = /[^ \.A-Za-z0-9_:, \-]/g.test(valueSt.trim());
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
    const handleSubmit =(e:FormEvent) =>{
        setData({
            ...Data,
            deleted:false,
            inserver:false,
        });
        if(props.update.chPas===true){
            props.upd({id:props.update.data.id, 
                soc:{
                    nombre_socio:Data.nombre_socio,
                    email:Data.email,
                    nombre_contacto:Data.nombre_contacto,
                    telefono: Data.telefono,
                    clabe: Data.clabe,
                    beneficiario: Data.beneficiario,
                    cuota: Data.cuota,
                    notas: Data.notas,
                    img64: "",
                    fecha_modifica:  new Date(),
                    fecha_agrega: new Date(),
                    deleted:Data.deleted,
                    inserver:Data.inserver
                }});
            setOpen(false);
            setIntfz({
                ttl:"Resgistro de Socios",
                bt:"Registrar",
            });
            setData(socio);
            return;
        };
        props.create({
            nombre_socio:Data.nombre_socio,
            email:Data.email,
            nombre_contacto:Data.nombre_contacto,
            telefono: Data.telefono,
            clabe: Data.clabe,
            beneficiario: Data.beneficiario,
            cuota: Data.cuota,
            notas: Data.notas,
            img64: "",
            fecha_modifica:  new Date(),
            fecha_agrega: new Date(),
            deleted:Data.deleted,
            inserver:Data.inserver});
        setOpen(false);
        setData(socio);
        return;
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
        <DialogTitle id="form-dialog-title">{intfz.ttl.toString()}</DialogTitle>
            <DialogContent  ref={reference}>
                <DialogContentText>
                    Formulario de Socios
                </DialogContentText>
            <ValidatorForm onSubmit={handleSubmit}>

            <App />
                <TextValidator
                    autoFocus
                    margin="dense"
                    id="name"
                    name="nombre_socio"
                    label="Nombre Socio"
                    type="text"
                    onChange={handleChange}
                    value={nombre_socio}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="contact_name"
                    name="nombre_contacto"
                    label="Nombre Contacto"
                    type="text"
                    onChange={handleChange}
                    value={nombre_contacto}
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
                <TextValidator
                    margin="dense"
                    id="telephone"
                    name="telefono"
                    label="Telefono de Contacto"
                    type="text"
                    onChange={handleChange}
                    value={telefono}
                    validators={["required","isValidTelephone"]}
                    errorMessages={["el campo es requerido","Debe ser un numero de almenos 10 digitos sin caracteres especiales"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="clabe"
                    name="clabe"
                    label="Clabe Interbancaria"
                    type="text"
                    onChange={handleChange}
                    value={clabe}
                    validators={["required","isValidClabe"]}
                    errorMessages={["el campo es requerido","La clabe debe de ser de almenos 18 numeros sin caracteres especiales"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="beneficiary"
                    name="beneficiario"
                    label="Beneficiario"
                    type="text"
                    onChange={handleChange}
                    value={beneficiario}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="quote"
                    name="cuota"
                    label="Cuota"
                    type="number"
                    onChange={handleChange}
                    value={cuota}
                    validators={["required",]}
                    errorMessages={["el campo es requerido",]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="notes"
                    name="notas"
                    label="Notas"
                    type="text"
                    onChange={handleChange}
                    value={notas}
                    validators={["required","isValidNote","notFT"]}
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
        </div>
    );
  }
  export default withStyles(styles)(modalSocio);
