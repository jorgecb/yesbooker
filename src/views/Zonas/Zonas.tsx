import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Grid } from "@material-ui/core";
import Zona from "../../database/Zonas";
import ModalZonas from "./modalZonas";
/* import MaterialTable, { Column } from 'material-table'; */
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import { card } from "../../assets/jss/material-dashboard-react";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import MUIDataTable from "mui-datatables";

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

/* interface Row{
    id: number;
    nombre: string;
    descripcion: string;
}
interface TableState{
    columns: Array<Column<Row>>;
    data: Row [];
}
 export default function MaterialTableDemo(){
    const [state, setState]= React.useState<TableState>({
        columns: [
            {title: 'id',field: 'id', type: 'numeric'},
            {title: 'nombre',field: 'nombre'},
            {title: 'descripcion', field: 'descripcion'},
            {
                lookup: {1: 'id' },
                title: 'nombre',
                field: 'descripcion',

            },

        ],
        data: [
            {nombre: 'nombre', descripcion: 'descripcion',id: 1},
            {
                nombre: 'nombre',
                descripcion: 'descripcion',
                id: 1,
            }
        ],
    });
    return(
        <MaterialTable 
        title= "zonas"
        columns={state.columns}
        data={state.data}
        editable={{
            onRowAdd: (newData) =>
            new Promise((resolve) =>{
                setTimeout(() =>{
                    resolve();
                    setState((prevState) => {
                        const data =[...prevState.data];
                        data.push(newData);
                        return{...prevState.data};
                    });
                },600);
            }),
            onRowUpdate: (newdata, oldData) =>
            new Promise((resolve) =>{
                setTimeout(() =>{
                    resolve();
                    if (oldData) {
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data[data.indexOf(oldData)]= newdata;
                            return{...prevState, data};
                        });
                    }
                }, 600);
            }),
            onRowDelete: (oldData) =>
            new Promise((resolve) =>{
                setTimeout(() =>{
                    resolve();
                    setState((prevState) =>{
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData),1);
                        return{...prevState, data};
                    });
                }, 600);
            }),
        }}
        />
    )
}
 */

const zonaList = (props: []) => {
  const [Zonas, setZonas] = useState({});
  let result = Array();
  useEffect(() => {
    /* Zona.add({nombre:" Zona Terraza", descripcion:"parte superior del restaurante", inserver:false}) */
    Zona.listAll().then(function(res) {
      setZonas(res);
      console.log(res);
    });
  }, []);
  const columuns = ["id", "nombre", "descripcion"];
  const data: any =
    Zonas.valueOf() != {} && Zonas.toString() != "[object Object]"
      ? Zonas.valueOf()
      : [];
  console.log(Zonas.valueOf());
  return (
    <React.Fragment>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="$38">
              <h4>tipos de zonas</h4>
              <ModalZonas />
              <MUIDataTable title={"zonas"} data={data} columns={columuns} />
            </CardHeader>
          </Card>
        </GridItem>
      </GridContainer>
    </React.Fragment>
  );
};
export default withStyles(styles)(zonaList);
