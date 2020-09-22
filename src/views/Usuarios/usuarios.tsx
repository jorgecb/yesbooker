import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/pickers';
import Warning from '@material-ui/icons/Warning';
import DateRange from '@material-ui/icons/DateRange';
import LocalOffer from '@material-ui/icons/LocalOffer';
import Update from '@material-ui/icons/Update';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import AccessTime from '@material-ui/icons/AccessTime';
import Accessibility from '@material-ui/icons/Accessibility';
import BugReport from '@material-ui/icons/BugReport';
import Code from '@material-ui/icons/Code';
import Cloud from '@material-ui/icons/Cloud';
import { createStyles, Grid } from '@material-ui/core';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import { card } from '../../assets/jss/material-dashboard-react';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';
import config from '../../config';
import User from './../../database/Usuarios';
import MUIDataTable from "mui-datatables";
import { CheckBox } from '@material-ui/icons';
import ModalSocio from './UserService';
import modalSocio from './UserService';

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
    const [Usuarios, setUsuarios] = useState({});


    let result = Array();
    useEffect(() => {
        //este codigo se ejecta cuando el comoponte se monta
        // nombre, materno, edad, inserver
        //este es un ejemplo de insert
        /* User.add({
            nombre: 'jorge',
            materno: 'barrera',
            edad: 33, inserver: false

        }) */

        const llenatabla = async () => {
            const res = await User.listAll();

            for (let count in res) {

                result.push(
                    {
                        id: res[count].id,
                        nombre: res[count].nombre,
                        materno: res[count].materno,
                        edad: res[count].edad
                    }
                );

            }
            setUsuarios(result);
            console.log(result);

            return data
        }

        llenatabla();

        //este es un ejemplo de listar



    }, [])

    const columns = ['Id', 'Rol', 'Email', 'Nombre', 'Imagen Perfil', 'Telefono', 'Borra', 'Editar'];

    const data = result;




    const { classes } = props;

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>

                <CardHeader plain={true} color="primary">
                    <h2 className={classes.cardTitleWhite}>Listado de Usuarios</h2>
                    <ModalSocio />
                </CardHeader>
                <MUIDataTable
                    title={'Usuarios'}
                    data={data}
                    columns={columns}
                />
                <CardBody>

                </CardBody>
            </GridItem>

        </GridContainer >


    )
}

export default withStyles(styles)(userList);