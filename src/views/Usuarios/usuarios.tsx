import React,{useEffect,useState} from 'react';


import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Store from '@material-ui/icons/Store';
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

const userList=(props: any)=>{
    const [Usuarios,setUsuarios ]=useState("Usuarios");
    useEffect(() => {
        //este codigo se ejecta cuando el comoponte se monta

        const response = fetch( config.UrlApi+ "Usuarios", {
            method: "GET",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json" // request content type
            }
        }).then(res => res.json())
            .then(res => setUsuarios(res))
            .catch((err) => console.log(err));



    }, [])


    return(
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
            <Card>
                    <CardHeader color="$38">
                        <h4 >Listado de Usuarios</h4>
               
                    </CardHeader>
                    <CardBody>
                        {Usuarios==null?
                            <div>hola</div>
                        :
                            <div>hay info en el server</div>

                        }

                  
                    </CardBody>
              </Card>
            </GridItem>
        </GridContainer>


    )
}

export default withStyles(styles)(userList);