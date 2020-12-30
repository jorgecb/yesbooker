import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Starship } from './typesUser';

export interface Starships {
  results: Starship[];
}

const useStarshipsService = () => {
  const [result, setResult] = useState<Service<Starships>>({
    status: 'loading'
  });

  useEffect(() => {
    fetch('http://localhost/reservas4/public/index.php/Usuario/list2')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);

  return result;
};

export default useStarshipsService;