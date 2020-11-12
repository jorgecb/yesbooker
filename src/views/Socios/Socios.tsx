import React, { useEffect, useState,} from 'react';
import ReactDOM from 'react-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Grid } from '@material-ui/core';
import SociosDB from '../../database/Socios';
import ModalSocio from './modalSocio';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { card } from '../../assets/jss/material-dashboard-react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import MUIDataTable,{MUIDataTableState,TableSelectCell} from "mui-datatables";

import { useDispatch } from 'react-redux';
import { addSocio,uptSocio,delSocio } from '../../actions/sociosAct'
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
    const [Socios, setSocios] = useState([]);
    const [socio, setSocio] = useState({
        data:{},
        chPas:false,});
    const onupd=(socioUpd:any)=>{
        console.log(socioUpd);
        SociosDB.update(socioUpd.id,socioUpd.soc);
        dispatch( uptSocio(socioUpd,'actualizado'));
        setSocio({
            data:{},
            chPas:false,});
        alert("se actualizo un registro");
        listadoUpd();
    };
    const oncreate=(socio:any)=>{
      SociosDB.add(socio);
      dispatch( addSocio(socio,'guardado'));
      setSocio({
        data:{},
        chPas:false,});
      listadoUpd();
    }/* 
    setSocio({
        ...socio.data.valueOf(),
    }); */
    const listadoUpd=()=>{
        SociosDB.listAll().then(function(res){/* 
            setSocios(res);
            if(Object.keys(res).length<=1){
                alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos");
            }; */
            console.log(res);
        });
        SociosDB.listNotDell().then(function(dev){
            setSocios(dev);
            if(Object.keys(dev).length<=1){
                alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos \n"+
                "es indisplensable llenar los dos primeros registros para comenzar");
            };
            console.log(dev);
        })
    }
    useEffect(()=>{
        console.log(socio);
    },[socio]);
    useEffect(()=>{
        /* Socio.add({nombre_socio:"chuy",email:"chuy@chuy.com",inserver:false}) */
        listadoUpd();
    },[]);
    const columns = ["id","nombre_socio","email"];
    let dataT:any;
    if(Object.keys(Socios).length<=1){
        if(Object.keys(Socios).length===0){
            dataT = [{nombre_socio:"example" , email:"example@live.com", deleted:false, inserver:true},
            {nombre_socio:"ejemplo" , email:"ejemplo@live.com", deleted:false, inserver:true}];
        }else{
            dataT = [Socios[0],
            {nombre_socio:"ejemplo" , email:"ejemplo@live.com", deleted:false, inserver:true}];
        };
    }else{
        dataT=Socios.valueOf();
    }
    //
    //aqui es donde se manejan los eventos y demas de la MUI-DT
    //
    const options:{} = {
        filterType: 'checkbox',
        onRowSelectionChange:(dat:any,cell:any)=>{
            console.log(cell);
            if(cell.length <= 0){
                setSocio({data:{},chPas:false,});
                return;
            }
            if(cell.length > 1){
                setSocio({
                    data:dataT[cell[0].dataIndex].valueOf(),
                    chPas:false,
                });
               return;
            }
            setSocio({data:dataT[cell[0].dataIndex].valueOf(),chPas:true});
            return },
            onRowsDelete:(ro:{data:[]},lookup:{})=>{
                ro.data.map((dato:{dataIndex:any})=>{
                    /* setSocio({data:dataT[dato.dataIndex],chPas:false}); */
                    let regD:any ={id:dataT[dato.dataIndex].id,nombre:dataT[dato.dataIndex].nombre_socio};
                    delete dataT[dato.dataIndex].id;
                    let valDel = confirm("deseas borrar datos: \n"+dataT[dato.dataIndex].nombre_socio);
                    if(valDel===true){
                        dataT[dato.dataIndex].deleted=true;
                        dataT[dato.dataIndex].inserver=false;
                        SociosDB.update(regD.id,dataT[dato.dataIndex]);
                        alert("Borrado correctamente: \n"+regD.nombre);
                        dispatch( delSocio(dataT[dato.dataIndex],'borrado'));
                        listadoUpd();
                    }else{
                        alert("Se conservo la información: \n"+regD.nombre);
                        listadoUpd();
                    };
                });
                setSocio({data:{},chPas:false,});
                return console.log(ro.data);},
    };
    return ( 
        <React.Fragment>
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="$38" >
                        <h4>Listado de Socios</h4><ModalSocio create={oncreate} update={socio} upd={onupd} />
                        <MUIDataTable
                            title={"Socios Comerciales"}
                            data={dataT}
                            columns={columns}
                            options={options}
                        >
                        </MUIDataTable>
                    </CardHeader>
                </Card>
            </GridItem>
        </GridContainer>
        </React.Fragment>
    );
}
export default withStyles(styles)(socioList);