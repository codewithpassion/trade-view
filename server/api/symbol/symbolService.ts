import { StatusCodes } from 'http-status-codes';

import { Zymbol } from '@/api/symbol/symbolModel';
import { symbolRepository } from '@/api/symbol/symbolRepository';
import { ResponseStatus, ServiceResponse } from '@/common/models/serviceResponse';
import { logger } from '@/server';

export const symbolService = {
  // Retrieves all symbols from the database
  findAll: async (): Promise<ServiceResponse<Zymbol[] | null>> => {
    try {
      const symbols = await symbolRepository.findAllAsync();
      if (!symbols) {
        return new ServiceResponse(ResponseStatus.Failed, 'No Zymbols found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Zymbol[]>(ResponseStatus.Success, 'Zymbols found', symbols, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding all symbols: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },

  // Retrieves a single symbol by its ID
  findById: async (id: string): Promise<ServiceResponse<Zymbol | null>> => {
    try {
      const symbol = await symbolRepository.findByIdAsync(id);
      if (!symbol) {
        return new ServiceResponse(ResponseStatus.Failed, 'Zymbol not found', null, StatusCodes.NOT_FOUND);
      }
      return new ServiceResponse<Zymbol>(ResponseStatus.Success, 'Zymbol found', symbol, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error finding symbol with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return new ServiceResponse(ResponseStatus.Failed, errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  },
};
