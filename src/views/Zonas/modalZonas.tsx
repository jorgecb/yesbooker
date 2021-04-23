import React, { FormEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
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
  nombre_zona?: string;
  descripcion?: string;
  inserver?: boolean;
  deleted?: boolean;
}
const Zona = (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  let zona: Zona = {
    nombre_zona: "",
    descripcion: "",
    deleted: false,
    inserver: false,
  };
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState<Zona>(zona);
  const { nombre_zona, descripcion } = Data;
  const [intfz, setIntfz] = useState({
    ttl: "Resgistro de Mesas",
    bt: "Registrar",
  });
  const valida = () => {
    ValidatorForm.addValidationRule("isValidName", (valueSt) => {
      let val: any = /[^ \.A-Za-z0-9_\-]/g.test(valueSt.trim());
      if (val) {
        return false;
      } else {
        return true;
      }
    });
    ValidatorForm.addValidationRule("notFT", (valueSt) => {
      let val: any = /(false|true|FALSE|TRUE)/g.test(valueSt.trim());
      if (val) {
        return false;
      } else {
        return true;
      }
    });
    ValidatorForm.addValidationRule("min", (valueSt) => {
      if (valueSt.length < 10) {
        return false;
      } else if (valueSt.length > 45) {
        return false;
      } else {
        return true;
      }
    });

    /*  ValidatorForm.addValidationRule("isValidTelephone", (valueSt) => {
      let val: any = /[^ \.0-9_+() \-]/g.test(valueSt.trim());
      let phrase: string = valueSt.trim();
      if (val || phrase.length < 10 || phrase.length > 15) {
        return false;
      } else {
        return true;
      }
    }); */
    /*    ValidatorForm.addValidationRule("isValidHour", (valueSt) => {
      let val: any = /[^ 0-9: \-]/g.test(valueSt.trim());
      let phrase: string = valueSt.trim();
      if (val || phrase.length < 4 || phrase.length > 6) {
        return false;
      } else {
        return true;
      }
    }); */
    /*  ValidatorForm.addValidationRule("isValidPostalCode", (valueSt) => {
      let val: any = /[^ 0-9 ]/g.test(valueSt.trim());
      let phrase: string = valueSt.trim();
      if (val || phrase.length < 4 || phrase.length > 8) {
        return false;
      } else {
        return true;
      }
    }); */
    /*   ValidatorForm.addValidationRule("isValidDirection", (valueSt) => {
      let val: any = /[^ \.A-Za-z0-9_#:,/ \-]/g.test(valueSt.trim());
      if (val) {
        return false;
      } else {
        return true;
      }
    }); */
    /* ValidatorForm.addValidationRule("isValidName",(valueSt)=>/(^[ \w+])/g.test(valueSt)); */
  };
  const handleClickOpen = () => {
    if (Object.keys(props.update.data).length !== 0) {
      return alert(
        "no se puede registrar mientras existan elementos selecionados"
      );
    }
    setOpen(true);
    valida();
  };
  const handleClickOpen2 = () => {
    if (props.update.chPas === false) {
      return alert("debes elegir sólo un(1) campo a la vez");
    }
    setData({
      nombre_zona: props.update.data.nombre_zona,
      descripcion: props.update.data.descripcion,
      /* fecha_agrega: props.update.data.fecha_agrega,
      fecha_modifica: props.update.data.fecha_modifica,
     */
    });
    setIntfz({ ttl: "Actualizar Mesa", bt: "Actualizar" });
    valida();
    setOpen(true);
  };
  const handleClose = () => {
    setData(zona);
    setIntfz({
      ttl: "Resgistro de Mesas",
      bt: "Registrar",
    });
    setOpen(false);
  };
  /* useEffect(() => {
        console.log(Data)
    }, [Data]) */
  const handleChange = (e: FormEvent<HTMLInputElement>, t: string) => {
    e.preventDefault();
    setData({
      ...Data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setData({
      ...Data,
      deleted: false,
      inserver: false,
    });
    let fech_agrega: any = new Date();
    let fech_modifica: any = new Date();
    if (props.update.chPas === true) {
      props.upd({
        nombre_zona: Data.nombre_zona,
        descripcion: Data.descripcion,

        deleted: Data.deleted,
        inserver: Data.inserver,
      });
      setOpen(false);
      setData(zona);
      setIntfz({
        ttl: "Resgistrar Zona",
        bt: "Registrar",
      });
      return;
    }
    props.create({
      nombre_zona: Data.nombre_zona,
      descripcion: Data.descripcion,
      deleted: Data.deleted,
      inserver: Data.inserver,
    });
    setOpen(false);
    setData(zona);
    return;
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ingresar Mesa
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
        Actualizar Mesa
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{intfz.ttl.toString()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Formulario para registro de Mesas
          </DialogContentText>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              autoFocus
              margin="dense"
              id="nombre_zona"
              name="nombre_zona"
              label="Nombre Zona"
              type="text"
              onChange={handleChange}
              value={nombre_zona}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresar false/true",
              ]}
              fullWidth
            />
            <TextValidator
              margin="dense"
              id="descripcion"
              name="descripcion"
              label="Descripción"
              type="text"
              onChange={handleChange}
              value={descripcion}
              validators={["required", "isValidName", "notFT", "min"]}
              errorMessages={[
                "El campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresar false/true",
                "Minimo de caracteres 10 y Maximo 45",
              ]}
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
};
export default withStyles(styles)(Zona);
