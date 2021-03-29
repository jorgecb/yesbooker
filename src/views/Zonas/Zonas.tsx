import React, { useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Grid } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import MUIDataTable from 'mui-datatables';
import Zone from '../../database/Zonas';
import ModalZonas from './modalZonas';


import { useDispatch } from 'react-redux';
import { addZona, uptZona, delZona } from '../../actions/zonasAct'


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
    const dispatch= useDispatch();
    const[Zonas, setZonas] = useState([]);
    const[Zona, setZona] = useState({
        data:{},
        chPas:false,
    });
    const onupd=(zonaUpd:any)=>{
        Zone.update(zonaUpd.id,zonaUpd.zon);
        dispatch( uptZona(zonaUpd,'actualizado'));
        setZona({
            data:{},
            chPas:false,
          });
        alert("se actualizo una zona");
        listadoUpd();
    };
    const oncreate=(zona:any)=>{
        Zone.add(zona);
        dispatch( addZona(zona,'guardado'));
        listadoUpd();
    }
    const listadoUpd=()=>{
        Zone.listAll().then(function(res){ 
           setZonas(res);
          if(Object.keys(res).length<=1){
              alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos");
          }; 
           
        });
      Zone.listNotDell().then(function(dev){
          setZonas(dev);
          if(Object.keys(dev).length<=1){
              alert("Los ejemplos se eliminaran automaticamente al ir ingresando datos \n"+
              "es indisplensable llenar los registros para comenzar");
          };
          
      });
    }
  useEffect(() => {
      
      listadoUpd();
  }, []);
    const columns = ["id","nombre_zona","descripcion"];
    let dataS:any;
        if(Object.keys(Zonas).length<=1){
            if(Object.keys(Zonas).length===0){
        dataS=[{nombre_zona:"name example", descripcion:"name descripcion", deleted:false,inserver:true},
        {nombre_zona:"nombre zona", descripcion:"nombre descripcion", deleted:false,inserver:true}];

    }else{
        dataS=[Zonas[0],
        {nombre_zona:"nombre zona", descripcion:"nombre descripcion", deleted:false,inserver:true}]; 
    }

}else{
    dataS=Zonas.valueOf();
};

const options:{} = {
    filterType: 'checkbox',
    onRowSelectionChange:(dat:any,cell:any)=>{
        if(cell.length <= 0){
            setZona({data:{},chPas:false,});
            return;
        };
        if(cell.length > 1){
            setZona({
                data:dataS[cell[0].dataIndex].valueOf(),
                chPas:false,
            });
           return;
        };
        setZona({data:dataS[cell[0].dataIndex].valueOf(),chPas:true,});
        return; },
        onRowsDelete:(ro:{data:[]},lookup:{})=>{
            ro.data.map((dato:{dataIndex:any})=>{
                /* setZona({data:dataT[dato.dataIndex],chPas:false,}); */
                let regD:any ={id:dataS[dato.dataIndex].id,nombre:dataS[dato.dataIndex].nombre_zona};
                delete dataS[dato.dataIndex].id;
                let valDel = confirm("deseas borrar datos: \n"+dataS[dato.dataIndex].nombre_zona);
                if(valDel===true){
                    dataS[dato.dataIndex].deleted=true;
                    dataS[dato.dataIndex].inserver=false;
                    Zone.update(regD.id,dataS[dato.dataIndex]);
                    dispatch( delZona(dataS[dato.dataIndex],'borrado'));
                    alert("Borrado correctamente: \n"+regD.nombre);
                    listadoUpd();
                }else{
                    alert("Se conservo la información: \n"+regD.nombre);
                    listadoUpd();
                };
                console.log(dato,Zona,dataS[dato.dataIndex],regD.id);
                
            });
            setZona({data:{},chPas:false,});
            return console.log(ro.data); },
};
 


return(

   
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
            <Card>
            <CardHeader color="$38">
                <h4>zonas</h4>
                <ModalZonas create={oncreate}update={Zonas} upd={onupd}/>
                <MUIDataTable
                title={"zonas"}
                data={dataS}
                columns={columns}
                options={options}
                />
            </CardHeader>
            </Card>
        </GridItem>
    </GridContainer>
   
)

}
export default withStyles(styles)(zonaList);
