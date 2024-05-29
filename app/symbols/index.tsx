import { useEffect, useState } from 'react';
import { useSymbols } from './data';

const Symbols: React.FC<{}> = () => {
  const { isLoading, symbols, error } = useSymbols();
  const [symbolsData, setSymbolsData] = useState('');

  useEffect(() => {
    if (symbols && symbols.length > 0) {
      setSymbolsData(symbols.map((s) => s.symbol).join(', '));
    }
  }, [symbols]);

  return <>Symbols: [{isLoading ? 'loading...' : symbolsData}]</>;
};

export default Symbols;
