import React, { Fragment, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LongMenu from "../../components/button/CodigoPais";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
//import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

interface Cliente {
  Nombre?: string;
  Telefono?: string;
  Email?: string;
  Idioma?: string;
  Edad?:string;
  inserver?: boolean;
}
const FormClientes = (props: any) => {
  let cliente: Cliente = {};
  const [open, setOpen] = useState(false);

  const [Data, setData] = useState<Cliente>(cliente);

  const { Nombre = "", Telefono = "", Email = "", Edad = ""} = Data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, [Data]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
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
      inserver: Data.inserver,
    });
    // SocioDB.add();
    setOpen(false);
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
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="Nombre"
              label="Nombre del Cliente"
              type="text"
              name="Nombre"
              value={Nombre}
              onChange={handleChange}
              //fullWidth
            />
            <TextField
              margin="dense"
              id="Telefono"
              label="Telefono"
              type="phone"
              name="Telefono"
              //fullWidth
              value={Telefono}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="Email"
              label="Correo Electronico"
              type="email"
              name="Email"
              //fullWidth
              value={Email}
              onChange={handleChange}
            />
            <LongMenu />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button color="primary" onClick={handleSubmit}>
              Registrar
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    </>
  );
};

export default FormClientes;
