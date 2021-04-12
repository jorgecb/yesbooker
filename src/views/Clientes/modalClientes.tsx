import React, { Fragment, useState, useRef, FormEvent } from "react";
import { MenuItem, Select } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import codigo from "../../database/AcCodigo";
import idioma from "../../database/AcIdioma";

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
const FormClientes = (props: any) => {
  let cliente: Cliente = {
    Nombre: "",
    Email: "",
    Edad: "",
    Telefono: "",
    CodigoPais: "",
    deleted: false,
    inserver: false,
  };
  const MakeItem = (X: any) => (
    <MenuItem value={X.codigo + X.pais}>
      {X.codigo} {X.pais}
    </MenuItem>
  );
  const Language = (X: any) => <MenuItem value={X.idioma}>{X.idioma}</MenuItem>;
  const [open, setOpen] = useState(false);
  const [Data, setData] = useState<Cliente>(cliente);
  const { Nombre, Email, Edad, Telefono } = Data;
  const [codigoP, setcodigoP] = useState([]);
  const [Idiomas, setIdiomas] = useState([]);
  const [Codigo, setCodigo] = useState("");
  const [Languages, setLanguages] = useState("");
  const [intfz, setIntfz] = useState({
    ttl: "Resgistro de Clientes",
    bt: "Registrar Cliente",
  });

  const handleClickOpen = () => {
    idioma.listAll().then((res: any) => {
      setIdiomas(res);
    });

    codigo.listAll().then((respuesta: any) => {
      setcodigoP(respuesta);
    });

    if (Object.keys(props.update.data).length !== 0) {
      return alert(
        "no se puede registrar el cliente mientras existan elementos seleccionados"
      );
    }
    setOpen(true);
    componentDidMount();
  };

  const handleClickOpening = () => {
    
      idioma.listAll().then((res: any) => {
        setIdiomas(res);
      });

      codigo.listAll().then((respuesta: any) => {
        setcodigoP(respuesta);
      });
      setData({
        Nombre: props.update.data.Nombre,
        Email: props.update.data.Email,
        Edad: props.update.data.Edad,
        Telefono: props.update.data.Telefono,
        CodigoPais: props.update.data.CodigoPais,
      });

      console.log(props.update.data.CodigoPais);

      setOpen(true);
      setIntfz({ ttl: "Actualizar Cliente", bt: "Actualizar" });
      componentDidMount();

    
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
      let val: any = /[^\.0-9\ -]/g.test(valueSt.trim());
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
    setOpen(false);
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setData({
      ...Data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCodigo(event.target.value as string);
  };

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguages(event.target.value as string);
  };

  const handleSubmit = () => {
    setData({
      ...Data,
      deleted: false,
      inserver: false,
    });

    if (props.update.client === true) {
      props.upd({
        id: props.update.data.id,
        clit: {
          Nombre: Data.Nombre,
          Telefono: Data.Telefono,
          Email: Data.Email,
          Edad: Data.Edad,
          Idioma: Languages,
          CodigoPais: Codigo,
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
      Idioma: Languages,
      CodigoPais: Codigo,
      deleted: Data.deleted,
      inserver: Data.inserver,
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
                  validators={["required", "isValidName"]}
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

                <TextValidator
                  margin="dense"
                  id="Edad"
                  label="Edad"
                  type="number"
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
                  validators={["email", "required"]}
                  errorMessages={["Correo invalido"]}
                />
                <br />
                <br />

                <Select
                  value={Codigo}
                  onChange={handleChangeSelect}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Selecciona Codigo de Pais
                  </MenuItem>
                  {codigoP.map(MakeItem)}
                </Select>
                <br />
                <br />
                <br />
                <Select value={Languages} onChange={handleSelect} displayEmpty>
                  <MenuItem value="" disabled>
                    Selecciona Idioma
                  </MenuItem>
                  {Idiomas.map(Language)}
                </Select>
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
