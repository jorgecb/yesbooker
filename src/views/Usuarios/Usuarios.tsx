import React, { useEffect, useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles, Grid } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import User from './../../database/Usuarios';
import MUIDataTable from "mui-datatables";
import ModalUsuario from './modalUsuario';

import { useDispatch } from 'react-redux';
import { addUsuario } from '../../actions/usuariosAct'
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

const userList = (props: any) => {
    const dispatch = useDispatch();
    const [Usuarios, setUsuarios] = useState({});
  
    let result=Array();
    //este codigo se ejecta cuando el comoponte se monta
        // nombre, materno, edad, inserver
        //este es un ejemplo de insert
        /* User.add({
            nombre: 'jorge',
            materno: 'barrera',
            edad: 33, inserver: false
        }) */
    const oncreate=(usuario:any)=>{
        User.add(usuario);
        dispatch( addUsuario(usuario,'guardado'));
        listadoUpd();
    }
    const listadoUpd=()=>{
            User.listAll().then(function(res){
                setUsuarios(res);
                console.log(res);
            });
        }
    useEffect(() => {
        
        listadoUpd();
    }, [])

    const columns = ["id", "nombre", "materno", "email"];
    const data:any = (Usuarios.valueOf() != {} && Usuarios.toString() != '[object Object]') 
    ? Usuarios.valueOf() : [];

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="$38">
                        <h4 >Listado de Usuarios</h4><ModalUsuario create={oncreate} />                       
                            <MUIDataTable
                            title={"Usuarios"}
                            data={data}
                            columns={columns}
                         
                            />

                    </CardHeader>
                    <CardBody>

                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>


    )
}

export default withStyles(styles)(userList);