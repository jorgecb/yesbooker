import React from 'react';
import { usePostUsuariosService } from '../../actions/usuariosAct';

const Usuarios: React.FC<{}> = () => {
  const service = usePostUsuariosService()


  const str1 = JSON.stringify(service);
 const st= JSON.parse(str1, function (k, v) {
    console.log(v);            // log the current property name, the last is "".
    return ;                  // return the unchanged property value.
  });
  const str2 = JSON.stringify(service, null, 4); // (Optional) beautiful indented output.
  /* console.log(str1); // Logs output to dev tools console.
  alert(str2); // Displays output using window.alert() */

  return (

    <div>
      {service.status === 'Cargando....' && <div>Cargando....</div>}




      {service.status === 'Cargado' &&
        service.payload.results.map(starship => (
          <div key={starship.data[0]}>{starship.email}</div>
        ))}

<ul >
      {service.status === 'Cargado' &&
        service.payload.results.map(todo => (
        <li key={todo.id}>
          
        </li>
      ))}
    </ul>


      {service.status === 'error' && (
        <div>ERROR</div>
      )
      }

    </div >

  );
};

export default Usuarios;
