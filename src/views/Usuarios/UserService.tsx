import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        TextField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }),
);

const options = [
    'Supervisor',
    'Gerente',
    'Cajero',
    'Mesero',
];


export default function modalSocio() {
    // eslint-disable-next-line react-hooks/rules-of-hooks





    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose1 = () => {
        setAnchorEl(null);
    };



    return (
        <div className="App">
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Agregar Usuario</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar Socio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Formulario para registro de Socios
                </DialogContentText>
                    <TextField id="filled-search" label="Search field" type="search" variant="filled" />

                    <TextField id="filled-search" label="Search field" type="search" variant="filled" />

                    <TextField id="filled-search" label="Search field" type="search" variant="filled" />

                </DialogContent>


                <List component="nav" aria-label="Device settings">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="Roles"
                        onClick={handleClickListItem}
                    >
                        <ListItemText primary="Roles" secondary={options[selectedIndex]} />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose1}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>









                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                </Button>
                    <Button onClick={handleClose} color="primary">
                        Registrar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}