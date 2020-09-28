import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import Cliente  from "../../database/Clientes";
import FormClientes from "./modalClientes"
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/pickers";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import { createStyles, Grid } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { card } from "../../assets/jss/material-dashboard-react";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import config from "../../config";
import User from "./../../database/Usuarios";
import MUIDataTable from "mui-datatables";
import { CheckBox } from "@material-ui/icons";
import globalVars from "../../config";

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

function Clientes(props: any) {
  const peticion = fetch(globalVars.UrlApi + "clientes", {
    method: "GET",
  });
  peticion.then((data) => console.log(data.json()));

  const [clientes, setClientes] = useState({});
  let result = Array();
  
  const oncreate = (cliente: any) => {
    Cliente.add(cliente);
    listadoUpd();
  };

  const listadoUpd = () => {
    Cliente.listAll().then(function(res) {
      setClientes(res);
      console.log(res);
    });
  };

  useEffect(() => {
    /* User.add({
            nombre: 'jorge',
            materno: 'barrera',
            edad: 33, inserver: false

        }) */
        listadoUpd();
      }, []);
   

  const columns = [
    "id",
    "Nombre",
    "Telefono",
    "Email",
    "edad",
    "Idioma",
    "Notas",
  ];
  const data: any =
    clientes.valueOf() != {} && clientes.toString() != "[object Object]"
      ? clientes.valueOf()
      : [];
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="$38">
          <h4>Listado de Clientes</h4>
            <FormClientes create={oncreate}/>

            <MUIDataTable
              title={"Listado de Clientes"}
              data={data}
              columns={columns}
            />
          </CardHeader>
          <CardBody />
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(Clientes);
