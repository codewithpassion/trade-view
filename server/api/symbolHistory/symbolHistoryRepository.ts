import fs from 'fs-extra';

import { SymbolHistory } from '@/api/symbolHistory/symbolHistoryModel';

let symbolHistories: SymbolHistory[] = [];

const saveSymbolHistorys = async (symbolHistories: SymbolHistory[]) => {
  await fs.writeFile('symbolHistories.json', JSON.stringify(symbolHistories, null, 2));
};

const loadSymbolHistorys = async (): Promise<SymbolHistory[]> => {
  if (symbolHistories.length > 0) {
    return symbolHistories;
  }
  if (!(await fs.pathExists('symbolHistories.json'))) {
    symbolHistories = [];
    saveSymbolHistorys(symbolHistories);
    return symbolHistories;
  }

  const symbolHistoriesData = await fs.readFile('symbolHistories.json', 'utf-8');
  return JSON.parse(symbolHistoriesData);
};

export const symbolHistoryRepository = {
  findAllAsync: async (): Promise<SymbolHistory[]> => {
    return loadSymbolHistorys();
  },

  findBySymbolAsync: async (symbol: string): Promise<SymbolHistory[] | null> => {
    return (await loadSymbolHistorys()).filter((symbolHistory) => symbolHistory.symbol == symbol) || null;
  },
};
