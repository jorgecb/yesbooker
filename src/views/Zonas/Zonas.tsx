import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Zona from '../../database/Zonas';
import ModalZonas from './modalZonas';
import { createStyles, Grid } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { card } from '../../assets/jss/material-dashboard-react';
import { cardHeader } from '../../assets/jss/material-dashboard-react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import MUIDataTable from 'mui-datatables';

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
const zonaList = (props:[] ) =>{
    const[Zonas, setZonas] = useState({});
    let result=Array();
    const oncreate =(zona:any)=>{
        Zona.add(zona);
        listadoUpd();
    }
    const listadoUpd=()=>{
        Zona.listAll().then(function(res){
            setZonas(res);
            console.log(res);
        });
    }
    useEffect(() => {
        listadoUpd();
       
},[]);
const columns = ["id","nombre_socio","email"];
    const data:any = (Zonas.valueOf() != {} && Zonas.toString() != '[object Object]') 
    ? Zonas.valueOf() : [];


return(

    <React.Fragment>
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CardHeader color="$38">
                <h4>zonas</h4><ModalZonas create={oncreate}/>
                <MUIDataTable
                title={"zonas"}
                data={data}
                columns={columns}
                />
            </CardHeader>
        </GridItem>
    </GridContainer>
    </React.Fragment>
)

}
export default withStyles(styles)(zonaList);
