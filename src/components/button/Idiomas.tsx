import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});



export default function SimpleListMenu(props:any) {
  

  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([{
    "id": "7",
    "idioma": "Árabe"
}]);

  useEffect(() => {
    fetch("http://reservasapi.yes-admin.com/index.php/idioma")
    /* fetch("http://localhost/restfull/public/idioma") */
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      ) 
  }, []) 


  return (
    <Autocomplete
      id="Idioma"
      style={{ width: 300 }}
      options={items}
      classes={{
        option: classes.option,
        
      }}
      autoHighlight
      renderOption={(option) => (
        <React.Fragment>
          <span>{(option.idioma)}</span>
          
        </React.Fragment>
        
      )} 
      getOptionLabel={(option) => option.idioma}
        
      renderInput={(params) => (
        <TextField
          {...params} 
          label="Idioma"
          variant="outlined"
          inputProps={{
            
            ...params.inputProps,
            autoComplete: 'Idioma',
            onBlur:(idi)=>{props.create({code:params.inputProps});return params.inputProps},
            
          }}
          
        />
        )} 
    />
  );
}