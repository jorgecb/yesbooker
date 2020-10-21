import React, { useEffect, useState, useRef } from 'react';
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
import MUIDataTable,{MUIDataTableState,TableSelectCell} from "mui-datatables";

import { useDispatch } from 'react-redux';
import { addSocio } from '../../actions/sociosAct'
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
    const dispatch = useDispatch();
    const re = useRef();
    const [Socios, setSocios] = useState({});
    const [socio, setSocio] = useState({
        data:{},
        chPas:true,});
    let est: MUIDataTableState;
    let result=Array();
    const oncreate=(socio:any)=>{
      Socio.add(socio);
      dispatch( addSocio(socio,'guardado'));
      listadoUpd();
    }/* 
    setSocio({
        ...socio.data.valueOf(),
    }); */
    const listadoUpd=()=>{
        Socio.listAll().then(function(res){
            setSocios(res);
            console.log(res);
        });
    }
    useEffect(()=>{
        console.log(socio);
    },[socio]);
    useEffect(()=>{
        /* Socio.add({nombre_socio:"chuy",email:"chuy@chuy.com",inserver:false}) */
        listadoUpd();
        console.log(re);
        console.log(est);
    },[]);
    const columns = ["id","nombre_socio","email"];
    const data:any = (Socios.valueOf() != {} && Socios.toString() != '[object Object]') 
    ? Socios.valueOf() : [];
    //
    //aqui es donde se manejan los eventos y demas de la MUI-DT
    //
    const options:{} = {
        filterType: 'checkbox',
        onRowSelectionChange:(dat:any,cell:any)=>{
            console.log(cell.length);
            if(cell.length <= 0){
                return;
            }
            if(cell.length > 1){
                setSocio({
                    data:data[cell[0].dataIndex].valueOf(),
                    chPas:false,
                });
               return alert("solo puedes seleccionar un campo");
            }
            console.log(data[cell[0].dataIndex].valueOf(),cell);
            setSocio({data:data[cell[0].dataIndex].valueOf(),chPas:true});
            return },
    }
    return ( 
        <React.Fragment>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="$38"  ref={re}>
                        <h4>Listado de Socios</h4><ModalSocio create={oncreate} update={socio} />
                        <MUIDataTable
                            title={"Socios Comerciales"}
                            data={data}
                            columns={columns}
                            options={options}
                        >
                            <TableSelectCell  
                                fixedHeader={true}
                                checked={true}
                                onChange={()=>console.log(est.selectedRows)}
                            />
                        </MUIDataTable>
                    </CardHeader>
                </Card>
            </GridItem>
        </GridContainer>
        </React.Fragment>
    );
}
export default withStyles(styles)(socioList);