import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Grid } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import ZonasDexie from "./../../database/Zonas";
import MUIDataTable from "mui-datatables";
import ModalUsuario from "./modalZonas";
import { useDispatch } from "react-redux";
import {

  uptUsuario,
  deletedZona,
  getZonas,
  postZona
} from "../../actions/zonasAct";

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

const ZonasList = (props: any) => {
  const dispatch = useDispatch();
  const [Zonas, setZonas] = useState([]);
  const [usuario, setUsuario] = useState({
    data: {},
    chPas: false,
  });

  const onupd = (usuarioUpd: any) => {
    console.log(usuarioUpd);
    /*     console.log(usuarioUpd);
     */
    /*  dispatch(putUsuarios(usuarioUpd.id, usuarioUpd.usr));
    console.log(usuarioUpd.id, usuarioUpd.usr); */

    /*  putUsuarios(usuarioUpd.id, usuarioUpd.usr); */
    dispatch(uptUsuario(usuarioUpd, "actualizado"));
    setUsuario({
      data: {},
      chPas: false,
    });
    listadoUpd();
    alert("se actualizo un registro");
  };
  const oncreate = (zona: any) => {

    /*  postUsuarios(usuario); */
    /* User.add(usuario);
     */dispatch(postZona(zona, "add"));
    /* listadoUpd(); */
    return;
  };
  const listadoUpd = () => {
    /*   ZonasDexie.listAll().then((res) => {
      setZonas(res);
      if (Object.keys(res).length <= 1) {
        alert(
          "Los ejemplos se eliminaran automaticamente al ir ingresando datos"
        );
      }
      console.log(res);
    }); */
    dispatch(getZonas({}, "List"));

    ZonasDexie.listNotDell().then((dev) => {
      setZonas(dev);
      if (Object.keys(dev).length <= 1) {
        alert(
          "Los ejemplos se eliminaran automaticamente al ir ingresando datos \n" +
          "es indisplensable llenar los dos primeros registros para comenzar"
        );
      }
      /*       console.log(dev);
       */
    });
  };
  useEffect(() => {
    listadoUpd();
  }, []);

  const columns = ["id", "nombre_zona"];
  let dataT: any;

  if (Object.keys(Zonas).length <= 1) {
    if (Object.keys(Zonas).length === 0) {
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
        Zonas[0],
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
    dataT = Zonas.valueOf();
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
          nombre_zona: dataT[dato.dataIndex].nombre_zona,
        };
        delete dataT[dato.dataIndex].id;
        let valDel = confirm(
          "deseas borrar datos: \n" + dataT[dato.dataIndex].nombre_zona
        );
        if (valDel === true) {
          dataT[dato.dataIndex].deleted = true;
          dataT[dato.dataIndex].inserver = false;
          ZonasDexie.update(regD.id, dataT[dato.dataIndex]);

          /*   deltedUsuarios(regD.id);  */

          dispatch(deletedZona(regD.id[dato.dataIndex], "borrado"));
          /*   dispatch(delUsuario(dataT[dato.dataIndex], "borrado")); */
          alert("Borrado correctamente: \n" + regD.nombre_zona);
          listadoUpd();
        } else {
          alert("Se conservo la información: \n" + regD.nombre_zona);
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

export default withStyles(styles)(ZonasList);
