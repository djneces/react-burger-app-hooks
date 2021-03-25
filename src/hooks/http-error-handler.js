import { useState, useEffect } from 'react';

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req; //return
  });
  //I need only the error
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      //return -> res => res
      setError(err);
    }
  );

  //cleaning up interceptors, preventing memory leaks
  useEffect(() => {
    //clean up function at the end of useEffect
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
