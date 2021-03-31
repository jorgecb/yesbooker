import React, { FormEvent, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles } from "@material-ui/core";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import acZona from '../../database/Zonas';
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
interface Zona {
  nombre_zona?: string,
  descripcion?: string,
  inserver?: boolean
}
const modalZonas = (props: any) => {
  let zona: Zona = { nombre_zona: "", descripcion: "" };
  const [open, setOpen] = useState(false);
  const [Data, setdata] = useState<Zona>(zona);
  const { nombre_zona, descripcion } = Data;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  /*  useEffect(()=>{
      console.log(Data);

    },[Data]) */
  const handleChange = (e: FormEvent<HTMLInputElement>, t: string) => {
    setdata({
      ...Data,
      [e.currentTarget.name]: e.currentTarget.value
    });
  };
  const handleSubmit = () => {
    setdata({
      ...Data,
      inserver: false,
    });
    if (props.update.chPas === true) {
      props.upd({
        id: props.update.data.id,
        usr: {
          nombre_zona: Data.nombre_zona,
          apellido: Data.descripcion,

          deleted: false,
          inserver: false,
        },
      });
      setOpen(false);
      setdata(zona);
      /*  setIntfz({
         ttl: "Resgistro de Usuarios",
         bt: "Registrar",
       }); */
      return;
    }

    props.create({
      nombre_zona: Data.nombre_zona,
      apellido: Data.descripcion,

    });
    setOpen(false);
    setdata(zona);
    return;
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        agregar Zona
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">agregar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            formulario para agregar un zona
          </DialogContentText>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              autoFocus
              margin="dense"
              id="name"
              name="nombre_zona"
              label="nombre zona"
              type="text"
              onChange={handleChange}
              value={nombre_zona}
              validators={["required"]}
              errorMessages={["el campo es requerido"]}
              fullWidth
            />

            <TextValidator
              autoFocus
              margin="dense"
              id="descripcion"
              name="descripcion"
              label="descripcion"
              type="text"
              onChange={handleChange}
              value={descripcion}
              validators={["required"]}
              errorMessages={["el campo es requerido"]}
              fullWidth
            />

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
          </Button>
              <Button onClick={handleSubmit} color="primary">
                agregar
          </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(modalZonas);
