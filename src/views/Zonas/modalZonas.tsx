import React, { useEffect , useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles } from "@material-ui/core";
import Zona from "../../database/Zonas";
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
interface Zona{
    nombre_zona? : string,
    descripcion? : string
    inserver? : boolean
}
const modalZonas = (zona:Zona={}) => {
  const [open, setOpen] = useState(false);
  const [Data, setdata] = useState<Zona>(zona);
  const {nombre_zona = "", descripcion = "", inserver = false} = Data;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
   useEffect(()=>{
      console.log(Data);

    },[Data])
    const handleChange = (e: {target:{nombre: any; value: any;};})=>{
      setdata({
        ...Data,
        [e.target.nombre] : e.target.value
      });
    };
    const handleSubmit =() =>{
      setdata({
        ...Data,
        inserver: false
      });
      console.log(Data);
      Zonadb.add({nombre_zona: Data.nombre_zona,descripcion: Data.descripcion, inserver: Data.inserver});
      setOpen(false);
    }
  
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
          <DialogContentText>formulario para agregar un zona</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            name= "nombre_zona"
            label="nombre_zona"
            type="text"
            value={nombre_zona}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            id="descripcion"
            label="descripcion"
            type="text"
            value={descripcion}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            agregar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(modalZonas);
