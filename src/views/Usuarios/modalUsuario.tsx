import React, { FormEvent, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  createStyles,
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  NativeSelect,
  Select,
} from "@material-ui/core";
import Rol from "../../database/AcRoles";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { App } from "./formImg";
import { Theme } from "@material-ui/core/styles";

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
    /*    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    }, */
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Usuario {
  nombre?: string;
  materno?: string;
  email?: string;
  Img64?: string;
  password?: string;
  repeatPassword?: string;
  rol?: string;

  deleted?: boolean;
  inserver?: boolean;
}
const modalUsuario = (props: any) => {
  const classes = useStyles();

  let usuario: Usuario = {
    nombre: "",
    materno: "",
    email: "",
    password: "",
    repeatPassword: "",
    rol: "",
    deleted: false,
    inserver: false,
  };
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState<Usuario>(usuario);
  const [Roles, setRoles] = useState([]);
  const [roleSelect, setRole] = React.useState("");

  const MakeItem = (X: any) => <MenuItem value={X.rol}>{X.rol}</MenuItem>;

  const { nombre, materno, email, rol, password, repeatPassword, Img64 } = Data;
  const [intfz, setIntfz] = useState({
    ttl: "Resgistro de Usuarios",
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
    /* ValidatorForm.addValidationRule("isValidName",(valueSt)=>/(^[ \w+])/g.test(valueSt)); */
  };

  const handleClickOpen = () => {
    if (Object.keys(props.update.data).length !== 0) {
      return alert(
        "no se puede registrar mientras existan elementos selecionados"
      );
    }
    Rol.listAll().then((res: any) => {
      setRoles(res);
    });

    setOpen(true);
    valida();
  };

  const handleClickOpen2 = () => {
    if (props.update.chPas === false) {
      return alert("debes elegir sólo un(1) campo a la vez");
    }
    setData({
      nombre: props.update.data.nombre,
      materno: props.update.data.materno,
      email: props.update.data.email,
      rol: props.update.data.rol,
    });
    setIntfz({ ttl: "Actualizar Usuario", bt: "Actualizar" });
    valida();
    setOpen(true);
  };
  const handleClose = () => {
    setData(usuario);
    setIntfz({
      ttl: "Resgistro de Sucursales",
      bt: "Registrar",
    });
    setOpen(false);
  };
  const handleChange = (e: FormEvent<HTMLInputElement>, t: string) => {
    setData({
      ...Data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
    /*    if (e.currentTarget.name === "password") {
      this.form.isFormValid(false);
    } */
  };

  const handleChange1 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const handleSubmit = () => {
    setData({
      ...Data,
      deleted: false,
      inserver: false,
    });
    if (props.update.chPas === true) {
      props.upd({
        id: props.update.data.id,
        usr: {
          nombre: Data.nombre,
          materno: Data.materno,
          email: Data.email,
          rol: roleSelect,
          deleted: false,

          inserver: false,
        },
      });
      setOpen(false);
      setData(usuario);
      setIntfz({
        ttl: "Resgistro de Usuarios",
        bt: "Registrar",
      });
      return;
    }

    props.create({
      nombre: Data.nombre,
      materno: Data.materno,
      email: Data.email,
      rol: roleSelect,

      deleted: Data.deleted,
      inserver: Data.inserver,
    });
    setOpen(false);
    setData(usuario);
    return;
  };
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Ingresar Usuario
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickOpen2}>
        Actualizar Usuario
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{intfz.ttl.toString()}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Formulario para registro de Usuarios
          </DialogContentText>
          <ValidatorForm onSubmit={handleSubmit}>
            <App />
            <TextValidator
              autoFocus
              margin="dense"
              id="name"
              name="nombre"
              label="Cargo"
              type="text"
              onChange={handleChange}
              value={nombre}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresal false/true",
              ]}
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
              validators={["required", "isEmail"]}
              errorMessages={[
                "el campo es requerido",
                "tiene que ser un formato de email valido",
              ]}
              fullWidth
            />
           {/*  <TextValidator
              label="Password"
              onChange={handleChange}
              name="password"
              type="password"
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={password}
            />
            <br />
            <TextValidator
              label="Repeat password"
              onChange={handleChange}
              name="repeatPassword"
              type="password"
              validators={["isPasswordMatch", "required"]}
              errorMessages={["password mismatch", "this field is required"]}
              value={repeatPassword}
            /> */}
            <TextValidator
              autoFocus
              margin="dense"
              id="name"
              name="nombre"
              label="Nombre"
              type="text"
              onChange={handleChange}
              value={nombre}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresal false/true",
              ]}
              fullWidth
            />

            <Select
              value={roleSelect}
              onChange={handleChange1}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="" disabled>
                Seleccione un Rol
              </MenuItem>
              {Roles.map(MakeItem)}
            </Select>
            <FormHelperText>Sele</FormHelperText>

            <TextValidator
              margin="dense"
              id="materno"
              name="materno"
              label="1° Apellido"
              type="text"
              onChange={handleChange}
              value={materno}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresal false/true",
              ]}
              width="50%"
            />
            <TextValidator
              margin="dense"
              id="materno"
              name="materno"
              label="2° Apellido"
              type="text"
              onChange={handleChange}
              value={materno}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresal false/true",
              ]}
              width="50%"
            />
            <TextValidator
              margin="dense"
              id="Telefono"
              name="Telefono"
              label="Telefono"
              type="text"
              onChange={handleChange}
              value={materno}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresal false/true",
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
export default withStyles(styles)(modalUsuario);
