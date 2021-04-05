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

export default function CountrySelect(props:any) {
  const classes = useStyles();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([{
    "id": "36",
    "codigo": "+53",
    "pais": "Cuba"
}]);

  useEffect(() => {
    
    fetch("http://reservasapi.yes-admin.com/index.php/codigo")
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
      id="Pais"
      style={{ width: 300 }}
      options={items}
      classes={{
        option: classes.option,
        
      }}
      autoHighlight
      renderOption={(option) => (
        <React.Fragment>
          <span>{(option.codigo)}</span>
          {option.pais}
          
        </React.Fragment>
        
      )} 
      getOptionLabel={(option) => option.codigo + option.pais}
        
      renderInput={(params) => (
        <TextField
          {...params} 
          label="Codigo de pais"
          variant="outlined"
          inputProps={{
            
            ...params.inputProps,
            autoComplete: 'codigopais',
            onBlur:(opt)=>{props.create({code:params.inputProps});return params.inputProps},
            
          }}
          
        />
        )} 
    />
  );
}