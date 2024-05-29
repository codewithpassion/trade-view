import { StatusCodes } from 'http-status-codes';

import { SymbolHistory } from '@/api/symbolHistory/symbolHistoryModel';
import { symbolHistoryRepository } from '@/api/symbolHistory/symbolHistoryRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const symbolHistoryService = {
  // Retrieves all symbolHistoryls from the database
  findAll: async (): Promise<ServiceResponse<SymbolHistory[] | null>> => {
    try {
      const symbolHistoryls = await symbolHistoryRepository.findAllAsync();
      if (!symbolHistoryls) {
        return new ServiceResponse(ResponseStatus.Failed, 'No SymbolHistorys found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<SymbolHistory[]>(
        ResponseStatus.Success,
        'SymbolHistorys found',
        symbolHistoryls,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding all symbolHistoryls: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single symbolHistoryl by its ID
  findBySymbol: async (symbol: string): Promise<ServiceResponse<SymbolHistory | null>> => {
    try {
      const symbolHistories = await symbolHistoryRepository.findBySymbolAsync(symbol);
      if (!symbolHistories) {
        return new ServiceResponse(ResponseStatus.Failed, 'SymbolHistory not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<SymbolHistory>(
        ResponseStatus.Success,
        'SymbolHistories found',
        symbolHistories,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error finding symbol histories for symbol ${symbol}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
