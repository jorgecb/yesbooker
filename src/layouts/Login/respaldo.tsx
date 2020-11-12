/* import React, { useState } from 'react';

import carta from 'assets/img/carta.png';
import profile from 'assets/img/profile.png';

import { Typography } from '@material-ui/core';
import bg from 'assets/img/bg2.png';




export default function Login() {
    var sectionStyle = {

        backgroundImage: `url(${bg})`
    };


    return (

        <div className="container" style={sectionStyle} >

            <div className="forms-container" >
                <div className="signin-signup">
                    <form className="sign-in-form" action="" method="post">

                        <div className="text">

                            <img src={carta} className="rocket" />
                            <p><Typography>Para continuar, inicia sesión</Typography></p>
                        </div>

                        <div className="alert">
                            <h3>error messaje</h3>
                        </div>


                        <div className="animated-input">
                            <input type="text" placeholder="Email" />

                            <input type="password" placeholder="password" />
                        </div>

                        <input type="submit" value="Iniciar" className="btn solid" />
                        <p className="social-text">Bienvenido</p>

                    </form>

                    <form action="#" className="sign-up-form">
                        <div className="text">
                            <img src={profile} alt="rocket" className="profile" />
                        </div>
                        <div className="alert">
                            <h3>error messaje</h3>
                        </div>
                        <div className="animated-input">
                            <input type="text" placeholder="Email" />
                            <input type="text" placeholder="Nombre/s" />
                            <input type="text" placeholder="Apellido" />
                            <input type="text" placeholder="Telefono" />
                            <input type="password" placeholder="Contraseña" />
                        </div>

                        <input type="submit" className="btn" value="Registrar" />
                        <p className="social-text">Ingrese sus datos de registro</p>

                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Crear una cuenta</h3>
                        <p>

                        </p>
                        <button className="btn transparent" id="sign-up-btn">
                            Registrarme
                    </button>
                    </div>
                    <img src="<?php echo base_url() ?>/assets/login/img/log.png" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Ya tienes cuenta</h3>
                        <p>

                        </p>
                        <button className="btn transparent" id="sign-in-btn">
                            Ya tengo Usuario
                    </button>
                    </div>
                    <img src="<?php echo base_url() ?>/assets/login/img/log2.png" className="image" alt="" />
                </div>
            </div>
        </div>


    );
}

 */
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './aLogin';


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

export default function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Item One" {...a11yProps(0)} />
                    <Tab label="Item Two" {...a11yProps(1)} />
                    <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Login />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <Login />        </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    <Login />        </TabPanel>
            </SwipeableViews>
        </div>
    );
}