import fs from 'fs-extra';

import { Trade } from '@/api/trade/tradeModel';

let trades: Trade[] = [];

const saveTrades = async (trades: Trade[]) => {
  await fs.writeFile('trades.json', JSON.stringify(trades, null, 2));
};

const loadTrades = async (): Promise<Trade[]> => {
  if (trades.length > 0) {
    return trades;
  }
  if (!(await fs.pathExists('trades.json'))) {
    trades = [];
    saveTrades(trades);
    return trades;
  }

  const tradesData = await fs.readFile('trades.json', 'utf-8');
  return JSON.parse(tradesData);
};

export const tradeRepository = {
  findAllAsync: async (): Promise<Trade[]> => {
    return loadTrades();
  },

  findByIdAsync: async (id: string): Promise<Trade | null> => {
    return (await loadTrades()).find((trade) => trade.id == id) || null;
  },
};
