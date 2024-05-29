import { useEffect } from 'react';
import useSWR from 'swr';

const apiURL = import.meta.env.VITE_APP_API_URL;

const useSymbols = (): { symbols: { symbol: string }[] | undefined; isLoading: boolean; error: any } => {
  const { data, error, isLoading } = useSWR(`${apiURL}/symbols`, async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (data.success === true) {
      return data.responseObject;
    }
    return null;
  });

  useEffect(() => {
    console.log('apiURL', apiURL);
  }, []);

  useEffect(() => {
    console.log('Error:', error);
  }, [error]);

  useEffect(() => {
    console.log('symbols', data);
  }, [data]);

  return {
    symbols: data,
    isLoading,
    error: error,
  };
};

export { useSymbols };
