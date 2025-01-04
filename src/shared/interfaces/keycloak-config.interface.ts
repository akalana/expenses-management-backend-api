/**
 * @fileOverview - Uses Zod schema for type-checking when accessing application
 * related configuration schemas.
 * This file defines the IKeycloakConfig schema using Zod for runtime validation and type inference.
 */
import { z } from 'zod';

export const IKeycloakConfigSchema = z.object({
    kcBaseUrl: z.string().url(),
    kcRealm: z.string(),
    kcTokenExchangeGrantType: z.string(),
    kcWebClientId: z.string(),
    kcWebClientSecret: z.string(),
});

//
export type IKeycloakConfig = z.infer<typeof IKeycloakConfigSchema>;
