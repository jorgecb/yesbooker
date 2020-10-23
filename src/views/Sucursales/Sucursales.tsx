import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Grid } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import SucursalesDB from "../../database/Sucursales";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import MUIDataTable from "mui-datatables";
import ModalSucursal from './modalSucursal';

import { useDispatch } from 'react-redux';
import { addSucursal } from '../../actions/sucursalesAct'
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
const sucursalList = (props : []) => {  
    const dispatch = useDispatch();
    const [Sucursales, setSucursales] = useState([]);
    const [Sucursal, setSucursal] = useState({
        data:{},
        chPas:false,
      });
    const onupd=(sucursalUpd:any)=>{
        console.log(sucursalUpd);
        SucursalesDB.update(sucursalUpd.id,sucursalUpd.suc);
        setSucursal({
            data:{},
            chPas:false,
          });
        alert("se actualizo un registro");
        listadoUpd();
    };
    const oncreate=(sucursal:any)=>{
      SucursalesDB.add(sucursal);
      dispatch( addSucursal(sucursal, 'guardado'));
      listadoUpd();
    }
    const listadoUpd=()=>{
      SucursalesDB.listAll().then(function(res){/* 
        setSucursales(res);
        if(Object.keys(res).length<=1){
            alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos");
        }; */
        console.log(res);
    });
    SucursalesDB.listNotDell().then(function(dev){
        setSucursales(dev);
        if(Object.keys(dev).length<=1){
            alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos \n"+
            "es indisplensable llenar los dos primeros registros para comenzar");
        };
        console.log(dev);
    });
    };
    useEffect(()=>{
        listadoUpd();
    },[]);
    const columns = ["id","nombre_sucursal","direccion"];
    let dataT:any;
    if(Object.keys(Sucursales).length<=1){
        if(Object.keys(Sucursales).length===0){
            dataT = [{nombre_sucursal:"example" , direccion:"whatever st. #666 sc. 6. wherever city, Estate", deleted:false, inserver:true},
            {nombre_sucursal:"ejemplo" , direccion:"x calle #666 col. Centro, Y ciudad/localidad, Estado", deleted:false, inserver:true}];
        }else{
            dataT = [Sucursales[0],
            {nombre_sucursal:"ejemplo" , direccion:"x calle #666 col. Centro, Y ciudad/localidad, Estado", deleted:false, inserver:true}];
        };
    }else{
        dataT=Sucursales.valueOf();
    };
    //
    //aqui es donde se manejan los eventos y demas de la MUI-DT
    //
    const options:{} = {
      filterType: 'checkbox',
      onRowSelectionChange:(dat:any,cell:any)=>{
          console.log(cell);
          if(cell.length <= 0){
              setSucursal({data:{},chPas:false,});
              return;
          };
          if(cell.length > 1){
              setSucursal({
                  data:dataT[cell[0].dataIndex].valueOf(),
                  chPas:false,
              });
             return;
          };
          setSucursal({data:dataT[cell[0].dataIndex].valueOf(),chPas:true,});
          return; },
          onRowsDelete:(ro:{data:[]},lookup:{})=>{
              ro.data.map((dato:{dataIndex:any})=>{
                  /* setSucursal({data:dataT[dato.dataIndex],chPas:false,}); */
                  let regD:any ={id:dataT[dato.dataIndex].id,nombre:dataT[dato.dataIndex].nombre_sucursal};
                  delete dataT[dato.dataIndex].id;
                  let valDel = confirm("deseas borrar datos: \n"+dataT[dato.dataIndex].nombre_sucursal);
                  if(valDel===true){
                      dataT[dato.dataIndex].deleted=true;
                      dataT[dato.dataIndex].inserver=false;
                      SucursalesDB.update(regD.id,dataT[dato.dataIndex]);
                      alert("Borrado correctamente: \n"+regD.nombre);
                      listadoUpd();
                  }else{
                      alert("Se conservo la información: \n"+regD.nombre);
                      listadoUpd();
                  };
                  console.log(dato,Sucursal,dataT[dato.dataIndex],regD.id);
              });
              return console.log(ro.data);},
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="$38">
            <h4>Listado de Sucursales</h4>
            <ModalSucursal create={oncreate} update={Sucursal} upd={onupd} />
            <MUIDataTable title={"Sucursales"} data={dataT} columns={columns} options={options} />
          </CardHeader>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default withStyles(styles)(sucursalList);
