import React, { FormEvent, useState, useRef, ChangeEvent } from "react";
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
import App from "./formImg";
import { Theme } from "@material-ui/core/styles";

import AvatarEditor, { Editor } from "./ImgEdit";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import Usuarios from "./Usuarios";

export type Img = {
  url: string;
  errorMessage: string | null;
};

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
  apellido?: string;
  email?: string;
  telefono?: string;
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
    Img64: "",
    nombre: "",
    email: "",
    apellido: "",
    telefono: "",
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

  const state = {
    user: {
      password: "",
      repeatPassword: "",
    },
  };

  const {
    nombre,
    apellido,
    telefono,
    email,
    password,
    repeatPassword,
    Img64,
  } = Data;
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
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      console.log(usuario.password);
      console.log(Data.password);
      console.log();

      if (value !== password) {
        return false;
      }
      return true;
    });
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
    Rol.listAll().then((res: any) => {
      setRoles(res);
    });
    
    setData({
      nombre: props.update.data.nombre,
      apellido: props.update.data.apellido,
      telefono: props.update.data.telefono,
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
          apellido: Data.apellido,
          telefono: Data.telefono,
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
      imageProfile: newImage,
      nombre: Data.nombre,
      apellido: Data.apellido,
      telefono: Data.telefono,
      email: Data.email,
      password: Data.password,
      passwordConfirma: Data.repeatPassword,
      rol: roleSelect,
      deleted: Data.deleted,
      inserver: Data.inserver,
    });
    setOpen(false);
    setData(usuario);
    return;
  };

  const [profileImg, setProfileImg] = useState<Img>({
    url: "",
    errorMessage: null,
  });
  const [newImage, setNewImage] = useState<string>("");
  const editorRef = useRef<Editor>(null);
  const { errorMessage, url } = profileImg;
  const [open2, setOpen2] = React.useState(false);

  const onAvatarImgChange = async (e: any) => {
    setOpen2(false);
    e.preventDefault();
    let file = e.target.files[0];
    if (!file) return;
    const validExts = ["jpg", "jpeg"];
    const maxFileSize = 5;
    const fileExt = file.name.substring(file.name.lastIndexOf(".") + 1);
    const fileSize = file.size / 1000000;
    if (!validExts.includes(fileExt)) {
      setOpen2(true);
      setProfileImg((prevState) => ({
        ...prevState,
        errorMessage: `Exteciones Soportadas(${validExts.join(" , ")})`,
      }));
      return;
    }

    if (fileSize > maxFileSize) {
      setOpen2(true);
      setProfileImg((prevState) => ({
        ...prevState,
        errorMessage: `Tamaño de imagen ${maxFileSize}Mb`,
      }));
      return;
    }

    const dataUrl = await getFileDataUrl(file);

    setProfileImg({
      url: dataUrl,
      errorMessage: null,
    });
  };

  const getFileDataUrl = (file: File) => {
    return new Promise<string>((res) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => res(reader.result as string);
    });
  };

  const onAvatarImgCancel = () => {
    setOpen2(false);
    setProfileImg({
      errorMessage: null,
      url: "",
    });
  };

  const onCrop = () => {
    if (editorRef && editorRef.current) {
      let url = editorRef.current.getImageScaledToCanvas().toDataURL();

      var string = url;
      var newstring = string.replace(
        "data:image/png;base64",
        "data:image/jpeg;base64"
      );

      setNewImage(newstring);
    }
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
            <div className="editor">
              <img src={newImage} />

              <AvatarEditor
                ref={editorRef}
                inputId="main"
                errorMessage={errorMessage}
                onCrop={onCrop}
                url={url}
                onChange={onAvatarImgChange}
                onCancel={onAvatarImgCancel}
              />

              <Collapse in={open2}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              </Collapse>
            </div>

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

            <TextValidator
              margin="dense"
              id="apellido"
              name="apellido"
              label="Apellido"
              type="text"
              onChange={handleChange}
              value={apellido}
              validators={["required", "isValidName", "notFT"]}
              errorMessages={[
                "el campo es requerido",
                "No ingresar caracteres especiales",
                "no ingresal false/true",
              ]}
              fullWidth
            />

            <TextValidator
              label="Password"
              onChange={handleChange}
              name="password"
              type="password"
              validators={
                [
                  /* "required" */
                ]
              }
              errorMessages={["this field is required"]}
              value={password}
            />
            <TextValidator
              label="Repeat password"
              onChange={handleChange}
              name="repeatPassword"
              type="password"
              validators={["isPasswordMatch" /* "required" */]}
              errorMessages={["password mismatch", "this field is required"]}
              value={repeatPassword}
            />

            <TextValidator
              autoFocus
              margin="dense"
              id="telefono"
              name="telefono"
              label="Telefono"
              type="text"
              onChange={handleChange}
              value={telefono}
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
            <FormHelperText>Selecione un Rol</FormHelperText>

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
