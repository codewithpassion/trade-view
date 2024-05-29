import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Trade = z.infer<typeof TradeSchema>;
export const TradeSchema = z.object({
  id: z.string().uuid(),
  symbol: z.string(),
  quantity: z.number(),
  price: z.number(),
  tradeType: z.enum(['buy', 'sell']),
  timestamp: z.date(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetTradeSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
