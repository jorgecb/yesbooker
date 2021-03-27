import React, { FormEvent, useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { KeyboardTimePicker } from "@material-ui/pickers";
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
 
interface Sucursal{
    nombre_sucursal?: string,
    nombre_contacto?: string,
    email_contacto?: string,
    telefono_contacto?: string,
    email_sucursal?: string,
    telefono_sucursal?: string,
    estado?: string,
    localidad?: string,
    direccion?: string,
    apertura?: string,
    cierre?: string,
    codigopostal?: string,
    fecha_agrega?: any,
    fecha_modifica?: any,
    deleted?:boolean,
    inserver?: boolean,
}
const modalSucursal = (props:any) =>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let sucursal:Sucursal={
        nombre_sucursal:"" ,
        nombre_contacto: "",
        email_contacto: "",
        telefono_contacto: "",
        email_sucursal: "",
        telefono_sucursal: "",
        estado: "",
        localidad: "",
        direccion: "",
        apertura: "",
        cierre: "",
        codigopostal: "",
        deleted:false, 
        inserver:false};
    const [open, setOpen] = useState(false);
    const [selectedDate, handleDateChange] = useState({dateOpen:new Date("December 11, 2020 07:30:00"),dateClose:new Date("December 11, 2020 20:08:00")});
    const [Data, setData] = useState<Sucursal>(sucursal);
    const {nombre_sucursal, nombre_contacto, email_contacto, email_sucursal, telefono_contacto, telefono_sucursal, estado, localidad, direccion, apertura, cierre, codigopostal} = Data;
    const [intfz,setIntfz] = useState({
        ttl:"Resgistro de Sucursales",
        bt:"Registrar",
    });
    useEffect(()=>{
        console.log(typeof selectedDate, selectedDate);/* 
        selectedDate.map((select:any)=>{
            console.log(select);
            return;
        }); */ 
        let hour1: string='';
        if(selectedDate.dateOpen.getHours() < 10 && selectedDate.dateOpen.getMinutes() < 10) hour1 = "0"+selectedDate.dateOpen.getHours()+":0"+selectedDate.dateOpen.getMinutes();
        else if(selectedDate.dateOpen.getHours() < 10 && selectedDate.dateOpen.getMinutes() >= 10) hour1 = "0"+selectedDate.dateOpen.getHours()+":"+selectedDate.dateOpen.getMinutes();
        else if(selectedDate.dateOpen.getHours() >= 10 && selectedDate.dateOpen.getMinutes() < 10) hour1 = selectedDate.dateOpen.getHours()+":0"+selectedDate.dateOpen.getMinutes();
        else if(selectedDate.dateOpen.getHours() >= 10 && selectedDate.dateOpen.getMinutes() >= 10) hour1 = selectedDate.dateOpen.getHours()+":"+selectedDate.dateOpen.getMinutes();
        let hour2: any='';
        if(selectedDate.dateClose.getHours() < 10 && selectedDate.dateClose.getMinutes() < 10) hour2 = "0"+selectedDate.dateClose.getHours()+":0"+selectedDate.dateClose.getMinutes();
        else if(selectedDate.dateClose.getHours() < 10 && selectedDate.dateClose.getMinutes() >= 10) hour2 = "0"+selectedDate.dateClose.getHours()+":"+selectedDate.dateClose.getMinutes();
        else if(selectedDate.dateClose.getHours() >= 10 && selectedDate.dateClose.getMinutes() < 10) hour2 = selectedDate.dateClose.getHours()+":0"+selectedDate.dateClose.getMinutes();
        else if(selectedDate.dateClose.getHours() >= 10 && selectedDate.dateClose.getMinutes() >= 10) hour2 = selectedDate.dateClose.getHours()+":"+selectedDate.dateClose.getMinutes();
        console.log(typeof hour1, hour1, typeof hour2, hour2);
    },[selectedDate]);
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
        ValidatorForm.addValidationRule("isValidPostalCode",(valueSt)=>{
            let val:any = /[^ 0-9 ]/g.test(valueSt.trim());
            let phrase:string = valueSt.trim();
            if(val || phrase.length < 4 || phrase.length > 8){
                return false;    
            }else{
                return true;}
        });
        ValidatorForm.addValidationRule("isValidDirection",(valueSt)=>{
            let val:any = /[^ \.A-Za-z0-9_#:,/ \-]/g.test(valueSt.trim());
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
            nombre_contacto: props.update.data.nombre_contacto,
            email_contacto: props.update.data.email_contacto,
            telefono_contacto: props.update.data.telefono_contacto,
            email_sucursal: props.update.data.email_sucursal,
            telefono_sucursal: props.update.data.telefono_contacto,
            estado: props.update.data.estado,
            localidad: props.update.data.localidad,
            direccion:props.update.data.direccion,
            apertura: props.update.data.apertura,
            cierre: props.update.data.cierre,
            codigopostal: props.update.data.codigopostal,
            fecha_agrega: props.update.data.fecha_agrega,
            fecha_modifica: props.update.data.fecha_modifica,
        });
        setIntfz({ttl:"Actualizar Sucursal",bt:"Actualizar"});
        valida();
        setOpen(true);
      };
    const handleClose = () => {
      setData(sucursal);
      setIntfz({
        ttl: "Resgistro de Sucursales",
        bt: "Registrar",
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
        let fecha_agrega: any = new Date();
        let fecha_modifica: any = new Date();
        if(props.update.chPas===true){
            props.upd({id:props.update.data.id, 
                suc:{nombre_sucursal:Data.nombre_sucursal,
                nombre_contacto: Data.nombre_contacto,
                email_contacto: Data.email_contacto,
                telefono_contacto: Data.telefono_contacto,
                email_sucursal: Data.email_sucursal,
                telefono_sucursal: Data.telefono_contacto,
                estado: Data.estado,
                localidad: Data.localidad,
                direccion:Data.direccion,
                apertura: Data.apertura,
                cierre: Data.cierre,
                codigopostal: Data.codigopostal,
                fecha_agrega: props.update.data.fecha_agrega,
                fecha_modifica: fecha_modifica.toString(),
                deleted:false,
                inserver:false}});
            setOpen(false);
            setData(sucursal);
            setIntfz({
                ttl:"Resgistro de Sucursales",
                bt:"Registrar",
            });
            return;
        };
        props.create({
            nombre_sucursal:Data.nombre_sucursal,
            nombre_contacto: Data.nombre_contacto,
            email_contacto: Data.email_contacto,
            telefono_contacto: Data.telefono_contacto,
            email_sucursal: Data.email_sucursal,
            telefono_sucursal: Data.telefono_contacto,
            estado: Data.estado,
            localidad: Data.localidad,
            direccion:Data.direccion,
            apertura: Data.apertura,
            cierre: Data.cierre,
            codigopostal: Data.codigopostal,
            fecha_agrega: fecha_agrega.toString(),
            fecha_modifica: fecha_modifica.toString(),
            deleted:Data.deleted,
            inserver:Data.inserver});
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
                    id="contact_email"
                    name="email_contacto"
                    label="Email Contacto"
                    type="email"
                    onChange={handleChange}
                    value={email_contacto}
                    validators={["required","isEmail"]}
                    errorMessages={["el campo es requerido","tiene que ser un formato de email valido"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="subsidiary_email"
                    name="email_sucursal"
                    label="Email Sucursal"
                    type="email"
                    onChange={handleChange}
                    value={email_sucursal}
                    validators={["required","isEmail"]}
                    errorMessages={["el campo es requerido","tiene que ser un formato de email valido"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="telephone"
                    name="telefono_contacto"
                    label="Telefono de Contacto"
                    type="text"
                    onChange={handleChange}
                    value={telefono_contacto}
                    validators={["required","isValidTelephone"]}
                    errorMessages={["el campo es requerido","Debe ser un numero de almenos 10 digitos sin caracteres especiales"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="subsiary_telephone"
                    name="telefono_sucursal"
                    label="Telefono de Sucursal"
                    type="text"
                    onChange={handleChange}
                    value={telefono_sucursal}
                    validators={["required","isValidTelephone"]}
                    errorMessages={["el campo es requerido","Debe ser un numero de almenos 10 digitos sin caracteres especiales"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="estate"
                    name="estado"
                    label="Estado"
                    type="text"
                    onChange={handleChange}
                    value={estado}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="locality"
                    name="localidad"
                    label="Localidad"
                    type="text"
                    onChange={handleChange}
                    value={localidad}
                    validators={["required","isValidName","notFT"]}
                    errorMessages={["el campo es requerido","No ingresar caracteres especiales","no ingresal false/true"]}
                    fullWidth
                />  
                <TextValidator
                    margin="dense"
                    id="address"
                    name="direccion"
                    label="Direccion"
                    type="text"
                    onChange={handleChange}
                    value={direccion}
                    validators={["required","isValidDirection"]}
                    errorMessages={["el campo es requerido","tiene que ser un formato de De direccion valido"]}
                    fullWidth
                />
                <TextValidator
                    margin="dense"
                    id="postal_code"
                    name="codigopostal"
                    label="Codigo Postal"
                    type="text"
                    onChange={handleChange}
                    value={codigopostal}
                    validators={["required","isValidPostalCode"]}
                    errorMessages={["el campo es requerido","Debe ser unicamente numeros de entre 4 y 6 digitos"]}
                    fullWidth
                />                        
                <KeyboardTimePicker
                    label="Apertura"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    value={selectedDate.dateOpen}
                    onChange={(date:any) => handleDateChange({...selectedDate,'dateOpen':date})}
                />                           
                <KeyboardTimePicker
                    label="Cierre"
                    placeholder="08:00 PM"
                    mask="__:__ _M"
                    value={selectedDate.dateClose}
                    onChange={(date:any) => handleDateChange({...selectedDate,'dateClose':date})}
                />{
                    /* 
                <TimePicker autoOk label="24 hours" value={selectedDate} onChange={(e)=>{console.log(e)}} /> */}
{/*             <TimePicker
                clearable
                ampm={false}
                label="24 hours"
                value={selectedDate}
                onChange={(e)=>{console.log(e)}}
            /> */}
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
};
export default withStyles(styles)(modalSucursal);
