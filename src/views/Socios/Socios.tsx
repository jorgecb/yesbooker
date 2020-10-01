import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Grid } from '@material-ui/core';
import Socio from '../../database/Socios';
import ModalSocio from './modalSocio';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { card } from '../../assets/jss/material-dashboard-react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import MUIDataTable from "mui-datatables";
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
const socioList = (props : []) => {  
    const [Socios, setSocios] = useState({});
    let result=Array();
    const oncreate=(socio:any)=>{
      Socio.add(socio);
      listadoUpd();
    }
    const listadoUpd=()=>{
        Socio.listAll().then(function(res){
            setSocios(res);
            console.log(res);
        });
    }
    useEffect(()=>{
        /* Socio.add({nombre_socio:"chuy",email:"chuy@chuy.com",inserver:false}) */
        listadoUpd();
        

    },[]);
    const columns = ["id","nombre_socio","email"];
    const data:any = (Socios.valueOf() != {} && Socios.toString() != '[object Object]') 
    ? Socios.valueOf() : [];

    return ( 
        <React.Fragment>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="$38">
                        <h4>Listado de Socios</h4><ModalSocio create={oncreate} />
                        <MUIDataTable
                            title={"Socios Comerciales"}
                            data={data}
                            columns={columns}
                            

                        />
                    </CardHeader>
                </Card>
            </GridItem>
        </GridContainer>
        </React.Fragment>
    )
}
export default withStyles(styles)(socioList);