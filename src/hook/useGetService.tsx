import { useEffect, useState } from 'react';
import { Service } from '../models/services';
import { IncidentsResp } from '../models/response';

export interface IncidentsResps {
  incidents: IncidentsResp[];
}

export const useGetService = (url: string) => {
  const [result, setResult] = useState<Service<IncidentsResps>>({
    status: 'loading'
  });

  useEffect(() => {
    if (url) {
      setResult({ status: 'loading' });
      fetch(url)
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: response }))
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [url]);

  return result;
};