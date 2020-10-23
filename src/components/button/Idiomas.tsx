import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Cliente  from "../../database/Clientes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const idiomas = [
  "selecciona tu idioma",
  'Ingles',
  'Frances',
  'Portugues',
  'Español',
];

export default function SimpleListMenu(props:any) {
  

  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [selected, setSelected] = React.useState("Selecciona tu idioma");

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index:any) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    setSelected(idiomas[index]);
    props.create({idi:idiomas[index]});
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  

 /*  props.create({
    Idioma: selectedIndex.Idioma
  }); */


  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          onClick={handleClickListItem}
        >
          <ListItemText primary={selected} secondary={selected} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {idiomas.map((option, index) => (
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
    </div>
  );
}