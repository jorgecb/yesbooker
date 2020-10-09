import React ,{ useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Grid } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import SucursalesDB from '../../database/Sucursales';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import MUIDataTable from "mui-datatables";
import ModalSucursal from './modalSucursal';

import { useDispatch } from 'react-redux';
import { addSucursal } from '../../actions/sucursalesAct'
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
const sucursalList = (props : []) => {  
    const dispatch = useDispatch();
    const [Sucursales, setSucursales] = useState({});
    let result=Array();
    const oncreate=(sucursal:any)=>{
      SucursalesDB.add(sucursal);
      dispatch( addSucursal(sucursal, 'guardado'));
      listadoUpd();
    }
    const listadoUpd=()=>{
        SucursalesDB.listAll().then(function(res){
            setSucursales(res);
            console.log(res);
        });
    }
    useEffect(()=>{
        listadoUpd();
    },[]);
    const columns = ["id","nombre_sucursal","direccion"];
    const data:any = (Sucursales.valueOf() != {} && Sucursales.toString() != '[object Object]') 
    ? Sucursales.valueOf() : [];

    return ( 
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="$38">
                        <h4>Listado de Sucursales</h4><ModalSucursal create={oncreate} />
                        <MUIDataTable
                            title={"Sucursales"}
                            data={data}
                            columns={columns}
                            

                        />
                    </CardHeader>
                </Card>
            </GridItem>
        </GridContainer>
    )
}
export default withStyles(styles)(sucursalList);