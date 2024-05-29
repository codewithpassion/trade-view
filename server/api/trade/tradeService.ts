import { StatusCodes } from 'http-status-codes';

import { Trade } from '@/api/trade/tradeModel';
import { tradeRepository } from '@/api/trade/tradeRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const tradeService = {
  // Retrieves all trades from the database
  findAll: async (): Promise<ServiceResponse<Trade[] | null>> => {
    try {
      const trades = await tradeRepository.findAllAsync();
      if (!trades) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Trades found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Trade[]>(ResponseStatus.Success, 'Trades found', trades, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all trades: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single trade by its ID
  findById: async (id: string): Promise<ServiceResponse<Trade | null>> => {
    try {
      const trade = await tradeRepository.findByIdAsync(id);
      if (!trade) {
        return new ServiceResponse(ResponseStatus.Failed, 'Trade not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Trade>(ResponseStatus.Success, 'Trade found', trade, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding trade with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
