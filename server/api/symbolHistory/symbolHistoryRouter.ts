import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetSymbolHistorySchema, SymbolHistorySchema } from '@/api/symbolHistory/symbolHistoryModel';
import { symbolHistoryService } from '@/api/symbolHistory/symbolHistoryService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const symbolHistoryRegistry = new OpenAPIRegistry();

symbolHistoryRegistry.register('SymbolHistory', SymbolHistorySchema);

export const symbolHistoryRouter: Router = (() => {
  const router = express.Router();

  symbolHistoryRegistry.registerPath({
    method: 'get',
    path: '/symbol-histories',
    tags: ['SymbolHistory'],
    responses: createApiResponse(z.array(SymbolHistorySchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await symbolHistoryService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  symbolHistoryRegistry.registerPath({
    method: 'get',
    path: '/symbol-histories/{id}',
    tags: ['SymbolHistory'],
    request: { params: GetSymbolHistorySchema.shape.params },
    responses: createApiResponse(SymbolHistorySchema, 'Success'),
  });

  router.get('/:symbol', validateRequest(GetSymbolHistorySchema), async (req: Request, res: Response) => {
    const symbol = req.params.symbol as string;
    const serviceResponse = await symbolHistoryService.findBySymbol(symbol);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
