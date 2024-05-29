import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

import { commonValidations } from '@/common/utils/commonValidation';

extendZodWithOpenApi(z);

export type Zymbol = z.infer<typeof ZymbolSchema>;

export const ZymbolSchema = z.object({
  symbol: z.string(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetZymbolSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
