/**
 * @fileoverview - Type checking database config file using zod.
 * This file it self define the IDBConfig schema using zod validation
 */
import { z } from 'zod';

export const IDBConfigSchema = z.object({
    url: z.string(),
});

export type IDBConfig = z.infer<typeof IDBConfigSchema>;
