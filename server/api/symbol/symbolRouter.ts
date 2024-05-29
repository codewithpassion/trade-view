import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { z } from 'zod';

import { GetZymbolSchema, ZymbolSchema } from '@/api/symbol/symbolModel';
import { symbolService } from '@/api/symbol/symbolService';
import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { handleServiceResponse, validateRequest } from '@/common/utils/httpHandlers';

export const symbolRegistry = new OpenAPIRegistry();

symbolRegistry.register('Zymbol', ZymbolSchema);

export const symbolRouter: Router = (() => {
  const router = express.Router();

  symbolRegistry.registerPath({
    method: 'get',
    path: '/symbols',
    tags: ['Zymbol'],
    responses: createApiResponse(z.array(ZymbolSchema), 'Success'),
  });

  router.get('/', async (_req: Request, res: Response) => {
    const serviceResponse = await symbolService.findAll();
    handleServiceResponse(serviceResponse, res);
  });

  symbolRegistry.registerPath({
    method: 'get',
    path: '/symbols/{id}',
    tags: ['Zymbol'],
    request: { params: GetZymbolSchema.shape.params },
    responses: createApiResponse(ZymbolSchema, 'Success'),
  });

  router.get('/:id', validateRequest(GetZymbolSchema), async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const serviceResponse = await symbolService.findById(id);
    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
