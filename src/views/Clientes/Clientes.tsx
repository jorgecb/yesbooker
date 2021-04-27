import React, { useEffect, useState } from "react";
import ClientesDb from "../../database/Clientes";
import FormClientes from "./modalClientes";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";
import {
  delCliente,
  postClientes,
  uptCliente,
} from "../../actions/clientesAct";
import { getCodigos } from "../../actions/CodigoAct";
import { getIdiomas } from "../../actions/IdiomaAct";

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

function Clientes() {
  const dispatch = useDispatch();
  const [Clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    data: {},
    client: false,
  });

  const onupd = (clienteUpd:any) => { 
    
    ClientesDb.update(clienteUpd.id,clienteUpd.suc);
    dispatch(uptCliente(clienteUpd,"actualizado"));
    setCliente({
      data:{},
      client: false,
    })
    alert("se actualizo correctamente")
    listadoUpd();
    
   /*  ClientesDb.update(putClientes, putClientes);
    dispatch(console.log('que hago aqui perro')
    );
    setCliente({
      data: {},
      client: false,
    });
    

    alert("Se actualizo el Registro");
    listadoUpd(); */
  };


  const oncreate = (cliente: any) => {
    ClientesDb.add(cliente);
    dispatch(postClientes(cliente, "guardado"));
    setCliente({
      data: {},
      client: false,
    });
    alert("guardado correctamente")
    listadoUpd();
  };

  const listadoUpd = () => {
    ClientesDb.listNotDell().then(function(dev) {
      setClientes(dev);
    });
  };

  useEffect(() => {
    listadoUpd();
    dispatch(getCodigos({}, "List"));
    dispatch(getIdiomas({}, "List"));
  }, []);

  const columns = [
    "Nombre",
    "CodigoPais",
    "Telefono",
    "Email",
    "Idioma",
    "Edad",
    "Notas",
  ];

  let clientela: any;

  if (Object.keys(Clientes).length === 0) {
    clientela = [
      {
        Nombre: "example",
        Email: "example@live.com",
        deleted: false,
        inserver: true,
      },
      {
        Nombre: "ejemplo",
        Email: "ejemplo@live.com",
        deleted: false,
        inserver: true,
      },
    ];
  } else {
    clientela = Clientes.valueOf();
  }

  const options: {} = {
    filterType: "checkbox",

    onRowSelectionChange: (dat: any, cell: any) => {
      if (cell.length <= 0) {
        setCliente({ data: {}, client: false });
        return;
      }
      if (cell.length > 1) {
        setCliente({
          data: clientela[cell[0].dataIndex].valueOf(),
          client: false,
        });
        return;
      }
      setCliente({
        data: clientela[cell[0].dataIndex].valueOf(),
        client: false,
      });
      return;
    },

    onRowsDelete: (ro: { data: [] }, lookup: {}) => {
      ro.data.map((dato: { dataIndex: any }) => {
        let regD: any = {
          id: clientela[dato.dataIndex].id,
          Nombre: clientela[dato.dataIndex].Nombre,
        };

        delete clientela[dato.dataIndex].id;

        let valDel = confirm("deseas borrar: \n" + clientela[dato.dataIndex].Nombre);

        if (valDel === true) {
          clientela[dato.dataIndex].deleted = true;
          clientela[dato.dataIndex].inserver = false;

          ClientesDb.update(regD.id, clientela[dato.dataIndex]);
          alert("Eliminado correctamente: \n" + regD.Nombre);

          dispatch(delCliente(clientela[dato.dataIndex], "borrado"));
          listadoUpd();
        } else {
          alert("se conservo la informacion: \n" + regD.Nombre);
          listadoUpd();
        }
      });
      setCliente({
        data: {},
        client: false,
      });
      return console.log(ro.data);

    },
  };

  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="$38">
              <h4>Listado de Clientes</h4>
              <FormClientes create={oncreate} update={cliente}  upd={onupd}/>
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
