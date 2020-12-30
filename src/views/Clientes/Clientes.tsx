import React, { useEffect, useState } from "react";
import ClientesDb from "../../database/Clientes";
import FormClientes from "./modalClientes";
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
import { useDispatch } from "react-redux";
import {addCliente,uptCliente,delCliente} from "../../actions/clientesAct"


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
  const dispatch = useDispatch();
  const [Clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    data: {},
    client: false,
  });

  const onupd = (clienteUpd: any) =>{
    
    console.log(clienteUpd)
    ClientesDb.update(clienteUpd.id, clienteUpd.clit);
    dispatch(uptCliente(clienteUpd,"Actualizado"));
    setCliente({
      data: {},
      client: false,
    });
    
    alert("Se actualizo el Registro");
    listadoUpd();
  }


  const oncreate = (cliente: any) => {
    ClientesDb.add(cliente);
    dispatch(addCliente(cliente,"guardado"));
    setCliente({
      data: {},
      client: false,
    })
    listadoUpd();
  };

  const listadoUpd = () => {
    
       ClientesDb.listNotDell().then(function(dev){
      setClientes(dev);

      
    });

  };

  useEffect(()=>{
    listadoUpd();
  }, []);

  const columns = [
    "id",
    "Nombre",
    "CodigoPais",
    "Telefono",
    "Email",
    "Idioma",
    "Edad",
    "Notas",
  ];

  let clientela:any;

  /* if (Object.keys(Clientes).length <= 1) {
    if (Object.keys(Clientes).length === 0) {
      clientela = [
        {
          nombre_socio: "example",
          email: "example@live.com",
          deleted: false,
          inserver: true,
        },
        {
          nombre_socio: "ejemplo",
          email: "ejemplo@live.com",
          deleted: false,
          inserver: true,
        },
      ];
    } else {
      clientela = [
        Clientes[0],
        {
          nombre_socio: "ejemplo",
          email: "ejemplo@live.com",
          deleted: false,
          inserver: true,
        },
      ];
    }
  } else  */{
    clientela = Clientes.valueOf();
  }
 
  

const options:{} = {
  filterType:"checkbox",
  onRowSelectionChange: (dat: any, cell:any) => {

    if(cell.length <=0){
      setCliente({data: {}, client:false});
      return;
    }
    if (cell.length > 1){
      setCliente({
        data: clientela[cell[0].dataIndex].valueOf(),
        client:false
      }); 
      return;
    }
    setCliente({
      data: clientela[cell[0].dataIndex].valueOf(),
      client:false
    }); 
    return;
  }, 
  
  onRowsDelete:(ro: {data:[] } )=>{
    ro.data.map((dato: { dataIndex: any })=>{

      let regD: any = {
        id: clientela[dato.dataIndex].id,
        Nombre: clientela[dato.dataIndex].Nombre,
      }; 
      
      delete regD.id;

      let valDel = confirm(
        "deseas borrar: \n" + regD.Nombre
      ); 
      

      if (valDel === true){
        clientela[dato.dataIndex].deleted = true;
        clientela[dato.dataIndex].inserver = false;

        ClientesDb.update(regD.id, clientela[dato.dataIndex])
        alert("Eliminado correctamente: \n" + regD.Nombre);

        dispatch(delCliente(clientela[dato.dataIndex], "borrado"));
        listadoUpd();
      } else {
        alert("se conservo la informacion: \n"+ regD.Nombre);
        listadoUpd();
      }
    });
    setCliente({
      data:{},
      client: false,
    });
    return
  }
}

  /* const  clientelas: any =
    Clientes.valueOf() != {} && Clientes.toString() != "[object Object]"
      ? Clientes.valueOf()
      : []; */
  return (
    <React.Fragment>
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="$38">
            <h4>Listado de Clientes</h4>
            <FormClientes create={oncreate} update={cliente} upd={onupd}/>

            <MUIDataTable
              title={"Listado de Clientes"}
              data={clientela}
              columns={columns}
              options={options}
            />
          </CardHeader>
          <CardBody />
        </Card>
      </GridItem>
    </GridContainer>
    </React.Fragment>
  );
}

export default withStyles(styles)(Clientes);
