import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Grid } from '@material-ui/core';
import Socio from '../../database/Socios';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { card } from '../../assets/jss/material-dashboard-react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import MUIDataTable from "mui-datatables";
import MaterialTable, { Column } from 'material-table';
import { arrayIncludes } from '@material-ui/pickers/_helpers/utils';
const styles = createStyles({
    cardCategoryWhite: {
        '&,& a,& a:hover,& a:focus': {
            color: 'rgba(255,255,255,.62)',
            margin: '0',
            fontSize: '14px',
            marginTop: '0',
            marginBottom: '0'
        },
        '& a,& a:hover,& a:focus': {
            color: '#FFFFFF'
        }
    }
});
interface Row{
    id:number;
    nombre_socio: String;
    email: String;
}
interface TableState{
    columns: Array<Column<Row>>;
    data: Row[];

}


const socioList = (props : []) => {  
    const [Socios, setSocios] = useState({});
    let result=Array();
    /*         console.log(res); */
        
        /* console.log(result); */
    useEffect(()=>{
        /* Socio.add({nombre_socio:"chuy",email:"chuy@chuy.com",inserver:false}) */
        const llenaTabla = async()=>{
            const resa = await Socio.listAll();
            
            for(let count in resa){
                result.push(
                    {
                        id:resa[count].id,
                        nombre_socio:resa[count].nombre_socio,
                        email:resa[count].email
                    }
                );
            }
            console.log(result);
            return setSocios(result);
        }
        llenaTabla();
    },[]);
    console.log({Socios});
    const columns = ["id","nombre_socio","email"];
    const soci = {
        try: {
            if(Socios:any){
                return Socios;
            }
        }, catch (error:any) {
            return "no params charged";
        }
    }
    console.log(soci);
    const data = [{id:1,nombre_socio:"yo",email:"false@false.com"},{id:2,nombre_socio:"yo",email:"false"},];
    const [state, setState] = useState<TableState>({
        columns :[
            {title:'Id',field:'id',type:'numeric'},
            {title:'Nombre Socio',field:'nombre_socio'},
            {title:'Email',field:'email'},
        ],
        data:data,
    });
    console.log(data);
    return (
         <MaterialTable
            title='Socios Comerciales'
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve)=>{
                        setTimeout(()=>{
                            resolve();
                            setState((prevState)=>{
                                const data =[...prevState.data];
                                data.push(newData);
                                return{
                                    ...prevState,data
                                };
                            });
                        },600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve)=>{
                        setTimeout(() => {
                            resolve();
                            if(oldData){
                                setState((prevState)=>{
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)]=newData;
                                    return {...prevState,data};
                                });
                            }
                        },600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
            }}
        /> /* 
       <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="$38">
                        <h4>Listado de Socios</h4>
                        <MUIDataTable
                            title={"Socios Comerciales"}
                            data={data}
                            columns={columns}

                        />
                    </CardHeader>
                </Card>
            </GridItem>
        </GridContainer>  */
    )
}
export default withStyles(styles)(socioList);