import React, { Fragment, useEffect, useState, useRef, FormEvent } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import LongMenu from "../../components/button/Idiomas";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import CountrySelect from "../../components/button/CodigoPais";
import MaskedInput from "react-text-mask";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

interface Cliente {
  Nombre?: string;
  Telefono?: string;
  Email?: string;
  Edad?: string;
  Idioma?: string;
  CodigoPais?: string;
  deleted?: boolean;
  inserver?: boolean;
}
function TextMaskCustom(props: any) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}
interface State {
  textmask: string;
}

const FormClientes = (props: any) => {
  const classes = useStyles();
  let cliente: Cliente = {
    Nombre: "",
    Email: "",
    Edad: "",
    Telefono: "",
    deleted: false,
    inserver: false,
  };
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState<Cliente>(cliente);
  const [values, setValues] = useState<State>({
    textmask: "(  )    -    ",
  });
  const { Nombre, Email, Edad, Telefono } = Data;

  const [intfz, setIntfz] = useState({
    ttl: "Resgistro de Clientes",
    bt: "Registrar Cliente",
  });

  const handleClickOpen = () => {
    if (Object.keys(props.update.data).length !== 0) {
      return alert(
        "no se puede registrar el cliente mientras existan elementos seleccionados"
      );
    }
    setOpen(true);
    componentDidMount();
  };

  const handleClickOpening = () => {
    if (props.update.client === true) {
      return alert("debes elegir sólo un(1) campo a la vez");
    }

    componentDidMount();
    setData({
      Nombre: props.update.data.Nombre,
      Email: props.update.data.Email,
      Edad: props.update.data.Edad,
      Telefono: props.update.data.Telefono,
    });
    console.log(props.update.data.Telefono);

    setIntfz({ ttl: "Actualizar Cliente", bt: "Actualizar" });
    componentDidMount();

    const val: any =
      props.update.client != true
        ? setOpen(true)
        : alert("solo se puede actualizar un registro");
    return val;
  };

  const componentDidMount = () => {
    ValidatorForm.addValidationRule("isValidName", (valueSt) => {
      let val: any = /[^ \.A-Za-z\-]/g.test(valueSt.trim());
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
    ValidatorForm.addValidationRule("email", (valueSt) => {
      let val: any = /[^ \.A-Z a-z 0-9 _@\-]/g.test(valueSt.trim());
      if (val) {
        return false;
      } else {
        return true;
      }
    });
   
    ValidatorForm.addValidationRule("Telefono", (valueSt) => {
      let val: any = /[^\.0-1-2-3-4-5-6-7-8-9\ -]/g.test(valueSt.trim());
      if (val) {
        return false;
      } else {
        return true;
      }
    });
  };

  const re = useRef(null);

  const handleClose = () => {
    setData(cliente);
    setIntfz({
      ttl: "Registro de Clientes",
      bt: "Registrar",
    });
    /*  setValues({
      textmask: "(  )    -    ",
    }); */
    setOpen(false);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>, t: string) => {
    setData({
      ...Data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  /* const handleChange2 = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }; */

  const handleSelect = (idiomas: any) => {
    setData({
      ...Data,
      Idioma: idiomas.idi,
    });
  };

  const handleSelectCodigo = (opt: any) => {
    setData({
      ...Data,
      CodigoPais: opt.code.value,
    });
  };

  const handleSubmit = () => {
    setData({
      ...Data,
      deleted: false,
      inserver: false,
    });
    console.log(Data);

    if (props.update.client === true) {
      props.upd({
        id: props.update.data.id,
        clit: {
          Nombre: Data.Nombre,
          Telefono: Data.Telefono,
          Email: Data.Email,
          Edad: Data.Edad,
          Idioma: Data.Idioma,
          CodigoPais: Data.CodigoPais,
          deleted: false,
          inserver: false,
        },
      });
      setOpen(false);
      setIntfz({
        ttl: "Registro de Clientes",
        bt: "registrar",
      });
      setData(cliente);
      return;
    }

    props.create({
      Nombre: Data.Nombre,
      Telefono: Data.Telefono,
      Email: Data.Email,
      Edad: Data.Edad,
      Idioma: Data.Idioma,
      CodigoPais: Data.CodigoPais,
      deleted: Data.deleted,
      inserver: Data.inserver,
    });
    setValues({
      textmask: "(  )    -    ",
    });
    setOpen(false);
    setData(cliente);
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">{intfz.ttl.toString()}</DialogTitle>
      <Fragment>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Registra Clientes <AddIcon />
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClickOpening}>
          Actualizar Cliente <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Clientes</DialogTitle>
          <DialogContentText>
            ................................................................................................................................
            ................................................................................................................................
            <ValidatorForm onSubmit={handleSubmit}>
              <DialogContent>
                <TextValidator
                  autoFocus
                  margin="dense"
                  id="Nombre"
                  label="Nombre del Cliente"
                  type="text"
                  name="Nombre"
                  value={Nombre}
                  onChange={handleChange}
                  validators={["required","isValidName"]}
                  errorMessages={["Nombre requerido"]}
                  fullWidth
                />

                <TextValidator
                  margin="dense"
                  id="Telefono"
                  label="Telefono"
                  type="number"
                  name="Telefono"
                  value={Telefono}
                  onChange={handleChange}
                  validators={["Telefono"]}
                  errorMessages={["ingresar solo numeros a diez digitos"]}
                  fullWidth
                />
        
                {/*  <Input
                  value={values.textmask}
                  onChange={handleChange2}
                  name="textmask"
                  id="Telefono"
                  inputComponent={TextMaskCustom as any}
                /> */}

                <TextValidator
                  margin="dense"
                  id="Edad"
                  label="Edad"
                  type="text"
                  name="Edad"
                  fullWidth
                  value={Edad}
                  onChange={handleChange}
                  validators={["required"]}
                  errorMessages={[""]}
                  ref={re}
                />
                <TextValidator
                  margin="dense"
                  id="Email"
                  label="Correo Electronico"
                  type="email"
                  name="Email"
                  fullWidth
                  value={Email}
                  onChange={handleChange}
                  validators={["email","required"]}
                  errorMessages={["Correo invalido"]}
                  ref={re}
                />
                <br />

                <CountrySelect create={handleSelectCodigo} />

                <LongMenu create={handleSelect} />
              </DialogContent>

              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  {intfz.bt}
                </Button>
              </DialogActions>
            </ValidatorForm>
          </DialogContentText>
        </Dialog>
      </Fragment>
    </>
  );
};

export default FormClientes;
