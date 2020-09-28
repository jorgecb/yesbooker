import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Zona from '../../database/Zonas';
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
const zonaList = (props: any) =>{
    const[Zonas, setZonas] = useState({});
    let result=Array();
    useEffect(() => {
       const llenatabla = async () => {
           const res = await Zona.listAll();
           for(let count in res){
               result.push(
                {id:res[count].id,
                    nombre:res[count].nombre,
                    descripcion:res[count].descripcion
                }
               );

           }
           setZonas(result);
           console.log(result);
           return data
       }
       llenatabla();
},[]);
const columuns = ["id", "nombre", "descripcion"];
const data = result;

return(

    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <CardHeader color="$38">
                <h4>zonas</h4>
                <MUIDataTable
                title={"zonas"}
                data={data}
                columns={columuns}
                />
            </CardHeader>
        </GridItem>
    </GridContainer>
)

}
export default withStyles(styles)(zonaList);

