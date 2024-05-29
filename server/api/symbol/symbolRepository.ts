import fs from 'fs-extra';

import { Zymbol } from '@/api/symbol/symbolModel';

let symbols: Zymbol[] = [];

const saveZymbols = async (symbols: Zymbol[]) => {
  await fs.writeFile('symbols.json', JSON.stringify(symbols, null, 2));
};

const loadZymbols = async (): Promise<Zymbol[]> => {
  if (symbols.length > 0) {
    return symbols;
  }
  if (!(await fs.pathExists('symbols.json'))) {
    symbols = [];
    saveZymbols(symbols);
    return symbols;
  }

  const symbolsData = await fs.readFile('symbols.json', 'utf-8');
  return JSON.parse(symbolsData);
};

export const symbolRepository = {
  findAllAsync: async (): Promise<Zymbol[]> => {
    return loadZymbols();
  },

  findByIdAsync: async (_symbol: string): Promise<Zymbol | null> => {
    return (await loadZymbols()).find((symbol) => symbol.symbol == _symbol) || null;
  },
};
