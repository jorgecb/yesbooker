import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { createStyles, Grid } from "@material-ui/core";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import MesasDB from "../../database/Mesas";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import MUIDataTable from "mui-datatables";
import ModalMesa from './modalMesas';

import { useDispatch } from 'react-redux';
import { addMesa, uptMesa, delMesa, fetchMesas } from '../../actions/mesasAct'
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
const mesasList = (props : []) => {
    const dispatch = useDispatch();
    const [Mesas, setMesas] = useState([]);
    const [Mesa, setMesa] = useState({
        data:{},
        chPas:false,
      });
    const onupd=(mesaUpd:any)=>{
        console.log(mesaUpd);
        MesasDB.update(mesaUpd.id,mesaUpd.suc);
        dispatch( uptMesa(mesaUpd,'actualizado'));
        setMesa({
            data:{},
            chPas:false,
          });
        alert("se actualizo un registro");
        listadoUpd();
    };
    const oncreate=(mesa:any)=>{
      MesasDB.add(mesa);
      dispatch( addMesa(mesa, 'guardado'));
      listadoUpd();
    }
    const listadoUpd=()=>{
      MesasDB.listAll().then(function(res){/*
        setMesas(res);
        if(Object.keys(res).length<=1){
            alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos");
        }; */
        console.log(res);
    });
    MesasDB.listNotDell().then(function(dev){
        setMesas(dev);
        if(Object.keys(dev).length<=1){
            alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos \n"+
            "es indisplensable llenar los dos primeros registros para comenzar");
        };
        console.log(dev);
    });
    dispatch(fetchMesas({}, 'List'));
    };
    useEffect(()=>{
        listadoUpd();
      },[]);
      const columns = ["id","id_zona","type","reserved",
      "fecha_agrega",
      "fecha_modifica"];
      let dataT:any;
      let fake_agrega: any = new Date();
      let fake_modifica: any = new Date();
      if(Object.keys(Mesas).length<=1){
          if(Object.keys(Mesas).length===0){
              dataT = [
                {
                 id:"1",
                 id_zona:"1" ,
                 type: "1",
                 reserved: "0",
                 fecha_agrega: fake_agrega.toString(),
                 fecha_modifica: fake_modifica.toString(),
                 deleted:false,
                 inserver:true},
                {
                id:"2",
                id_zona:"1",
                type: "1",
                reserved: "0",
                fecha_agrega: fake_agrega.toString(),
                fecha_modifica: fake_modifica.toString(),
                deleted:false,
                inserver:true}];
        }else{
            dataT = [Mesas[0],
            {    
            id:"1",
            id_zona:"1" ,
            postition: "(234x,123y)",
            type: "1",
            reserved: "0",
            fecha_agrega: fake_agrega.toString(),
            fecha_modifica: fake_modifica.toString(),
            deleted:false,
            inserver:true}];
        };
    }else{
        dataT=Mesas.valueOf();
    };
    //
    //aqui es donde se manejan los eventos y demas de la MUI-DT
    //
    const options:{} = {
      filterType: 'checkbox',
      onRowSelectionChange:(dat:any,cell:any)=>{
          console.log(cell);
          if(cell.length <= 0){
              setMesa({data:{},chPas:false,});
              return;
          };
          if(cell.length > 1){
              setMesa({
                  data:dataT[cell[0].dataIndex].valueOf(),
                  chPas:false,
              });
             return;
          };
          setMesa({data:dataT[cell[0].dataIndex].valueOf(),chPas:true,});
          return; },
          onRowsDelete:(ro:{data:[]},lookup:{})=>{
              ro.data.map((dato:{dataIndex:any})=>{
                  /* setMesa({data:dataT[dato.dataIndex],chPas:false,}); */
                  let regD:any ={id:dataT[dato.dataIndex].id,nombre:dataT[dato.dataIndex].nombre_mesa};
                  delete dataT[dato.dataIndex].id;
                  let valDel = confirm("deseas borrar datos: \n"+dataT[dato.dataIndex].nombre_mesa);
                  if(valDel===true){
                      dataT[dato.dataIndex].deleted=true;
                      dataT[dato.dataIndex].inserver=false;
                      MesasDB.update(regD.id,dataT[dato.dataIndex]);
                      dispatch( delMesa(dataT[dato.dataIndex],'borrado'));
                      alert("Borrado correctamente: \n"+regD.nombre);
                      listadoUpd();
                  }else{
                      alert("Se conservo la información: \n"+regD.nombre);
                      listadoUpd();
                  };
                  console.log(dato,Mesa,dataT[dato.dataIndex],regD.id);
              });
              setMesa({data:{},chPas:false,});
              return console.log(ro.data);},
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="$38">
            <h4>Listado de Mesas</h4>
            <ModalMesa create={oncreate} update={Mesa} upd={onupd} />
            <MUIDataTable title={"Mesas"} data={dataT} columns={columns} options={options} />
          </CardHeader>
        </Card>
      </GridItem>
    </GridContainer>
  );
};
export default withStyles(styles)(mesasList);
