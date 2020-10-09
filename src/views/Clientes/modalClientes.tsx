import React, { Fragment, useEffect, useState, useRef, FormEvent } from "react";
import Button from "@material-ui/core/Button";
import LongMenu from "../../components/button/Idiomas";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MenuPopupState from "../../components/button/CodigoPais";

interface Cliente {
  Nombre?: string;
  Telefono?: number;
  Email?: string;
  Edad?: string;
  Idioma?: string;
  CodigoPais?: string;
  inserver?: boolean;
}
const FormClientes = (props: any) => {
  let cliente: Cliente = {};
  const [open, setOpen] = useState(false);

  const [Data, setData] = useState<Cliente>(cliente);

  const {
    Nombre = "",
    Telefono = Number,
    Email = "",
    Edad = "",
    Idioma = "",
    CodigoPais = "",
  } = Data;

  const componentDidMount = () => {
    ValidatorForm.addValidationRule("isValidName", (string) =>
      /[a-zA-Z \u00E0-\u00F0]{1,20}/g.test(string)
    );
  };

  const re = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
    componentDidMount();
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*  useEffect(() => {}, [Data]); */

  const handleChange = (e: FormEvent<HTMLInputElement>, t: string) => {
    setData({
      ...Data,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSelect = (idiomas: any) => {
    setData({
      ...Data,
      Idioma: idiomas.idi,
    });
  };
  const handleSubmit = () => {
    setData({
      ...Data,
      inserver: false,
    });

    props.create({
      Nombre: Data.Nombre,
      Telefono: Data.Telefono,
      Email: Data.Email,
      Edad: Data.Edad,
      Idioma: Data.Idioma,
      inserver: Data.inserver,
    });
    setOpen(false);
    setData(cliente);
  };
  return (
    <>
      <Fragment>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Registra Clientes <AddIcon />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Clientes</DialogTitle>
          <DialogContentText>
            ........................................................................................................................................................................................
                                                  
            ........................................................................................................................................................................................
          
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
                validators={["required"]}
                errorMessages={["Nombre requerido"]}
                ref={re}
                fullWidth
              />
              <TextValidator
                margin="dense"
                id="Telefono"
                label="Telefono"
                type="Numbers"
                name="Telefono"
                fullWidth
                value={Telefono}
                onChange={handleChange}
                validators={["required"]}
                errorMessages={[
                  "Telefono invalido",
                  "Telefono maximo 10 digitos",
                ]}
                ref={re}
              />
              <TextValidator
                margin="dense"
                id="Edad"
                label="Edad"
                type="text"
                name="Edad"
                fullWidth
                value={Edad}
                onChange={handleChange}
                validators={["required", "isValidName"]}
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
                validators={["required", "isValidName"]}
                errorMessages={["Correo invalido"]}
                ref={re}
              />
              <MenuPopupState />
              <LongMenu create={handleSelect} />
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancelar
              </Button>
              <Button color="primary" type="submit">
                Registrar
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
