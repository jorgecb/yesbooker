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
const socioList = (props : any) => {  
    const [Socios, setSocios] = useState({});
    let result = Array();
    useEffect(()=>{
        Socio.add({nombre_socio:"chuy",email:"chuy@chuy.com",inserver:false})
        const llenaTabla = async()=>{
            const res = await Socio.listAll();
            for(let count in res){
                result.push(
                    {
                        id:res[count].id,
                        nombre_socio:res[count].nombre_socio,
                        email:res[count].email
                    }
                );
            }
            setSocios(result);
            console.log(result);
            return data 
        }
        llenaTabla();
    },[]);
    const columns = ["id","nombre_socio","email"];
    const data = result;

    return (
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
        </GridContainer>
    )
}
export default withStyles(styles)(socioList);