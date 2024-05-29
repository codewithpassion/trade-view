import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type SymbolHistory = z.infer<typeof SymbolHistorySchema>;
export const SymbolHistorySchema = z.object({
  symbol: z.string(),
  timestamp: z.date(),
  value: z.number(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetSymbolHistorySchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
