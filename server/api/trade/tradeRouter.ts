import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetTradeSchema, TradeSchema } from '@/api/trade/tradeModel';
import { tradeService } from '@/api/trade/tradeService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const tradeRegistry = new OpenAPIRegistry();

tradeRegistry.register('Trade', TradeSchema);

export const tradeRouter: Router = (() => {
  const router = express.Router();

  tradeRegistry.registerPath({
    method: 'get',
    path: '/trades',
    tags: ['Trade'],
    responses: createApiResponse(z.array(TradeSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await tradeService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  tradeRegistry.registerPath({
    method: 'get',
    path: '/trades/{id}',
    tags: ['Trade'],
    request: { params: GetTradeSchema.shape.params },
    responses: createApiResponse(TradeSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetTradeSchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await tradeService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
