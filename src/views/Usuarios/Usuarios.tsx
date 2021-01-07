import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Grid } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import User from "./../../database/Usuarios";
import MUIDataTable from "mui-datatables";
import ModalUsuario from "./modalUsuario";

import { useDispatch } from "react-redux";
import { addUsuario, uptUsuario, delUsuario } from "../../actions/usuariosAct";
import { getRoles } from "../../actions/Roles";

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

const userList = (props: any) => {
  const dispatch = useDispatch();
  const [Usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({
    data: {},
    chPas: false,
  });
  const onupd = (usuarioUpd: any) => {
    /*     console.log(usuarioUpd);
     */ User.update(usuarioUpd.id, usuarioUpd.usr);
    dispatch(uptUsuario(usuarioUpd, "actualizado"));
    setUsuario({
      data: {},
      chPas: false,
    });
    alert("se actualizo un registro");
    listadoUpd();
  };
  const oncreate = (usuario: any) => {
    User.add(usuario);
    dispatch(addUsuario(usuario, "guardado"));
    listadoUpd();
  };
  const listadoUpd = () => {
    User.listAll().then(function(res) {
      /* 
          setUsuarios(res);
          if(Object.keys(res).length<=1){
              alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos");
          }; */
      /*       console.log(res);
       */
    });
    User.listNotDell().then(function(dev) {
      setUsuarios(dev);
      if (Object.keys(dev).length <= 1) {
        alert(
          "Los ejemplos se eliminaran automaticamente al ir ingresando datos \n" +
            "es indisplensable llenar los dos primeros registros para comenzar"
        );
      }
      /*       console.log(dev);
       */
    });
    dispatch(getRoles({}, "List"));
  };
  useEffect(() => {
    listadoUpd();
  }, []);

  const columns = ["id", "nombre", "rol", "materno", "email"];
  let dataT: any;
  if (Object.keys(Usuarios).length <= 1) {
    if (Object.keys(Usuarios).length === 0) {
      dataT = [
        {
          nombre: "example",
          materno: "last",
          email: "example@live.com",
          deleted: false,
          inserver: true,
        },
        {
          nombre: "ejemplo",
          materno: "last",
          email: "ejemplo@live.com",
          deleted: false,
          inserver: true,
        },
      ];
    } else {
      dataT = [
        Usuarios[0],
        {
          nombre: "ejemplo",
          materno: "last",
          email: "ejemplo@live.com",
          deleted: false,
          inserver: true,
        },
      ];
    }
  } else {
    dataT = Usuarios.valueOf();
  }
  //
  //aqui es donde se manejan los eventos y demas de la MUI-DT
  //
  const options: {} = {
    filterType: "checkbox",
    onRowSelectionChange: (dat: any, cell: any) => {
      console.log(cell);
      if (cell.length <= 0) {
        setUsuario({ data: {}, chPas: false });
        return;
      }
      if (cell.length > 1) {
        setUsuario({
          data: dataT[cell[0].dataIndex].valueOf(),
          chPas: false,
        });
        return;
      }
      setUsuario({ data: dataT[cell[0].dataIndex].valueOf(), chPas: true });
      return;
    },
    onRowsDelete: (ro: { data: [] }, lookup: {}) => {
      ro.data.map((dato: { dataIndex: any }) => {
        /* setUsuario({data:dataT[dato.dataIndex],chPas:false,}); */
        let regD: any = {
          id: dataT[dato.dataIndex].id,
          nombre: dataT[dato.dataIndex].nombre,
        };
        delete dataT[dato.dataIndex].id;
        let valDel = confirm(
          "deseas borrar datos: \n" + dataT[dato.dataIndex].nombre
        );
        if (valDel === true) {
          dataT[dato.dataIndex].deleted = true;
          dataT[dato.dataIndex].inserver = false;
          User.update(regD.id, dataT[dato.dataIndex]);
          dispatch(delUsuario(dataT[dato.dataIndex], "borrado"));
          alert("Borrado correctamente: \n" + regD.nombre);
          listadoUpd();
        } else {
          alert("Se conservo la información: \n" + regD.nombre);
          listadoUpd();
        }
        setUsuario({ data: {}, chPas: false });
        console.log(dato, usuario, dataT[dato.dataIndex], regD.id);
      });
      return console.log(ro.data);
    },
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="$38">
            <h4>Listado de Usuarios</h4>
            <ModalUsuario create={oncreate} update={usuario} upd={onupd} />
            <MUIDataTable
              title={"Usuarios"}
              data={dataT}
              columns={columns}
              options={options}
            />
          </CardHeader>
          <CardBody />
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default withStyles(styles)(userList);
