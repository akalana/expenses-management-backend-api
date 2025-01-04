import { z } from 'zod';

// Define the Zod schema for the PAT (Personal Access Token) response
export const IPatTokenResponseSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    refresh_expires_in: z.number(),
    scope: z.string(),
    token_type: z.string(),
});

//
export type IPatTokenResponse = z.infer<typeof IPatTokenResponseSchema>;

// Define the Zod schema for user data
export const IUserSchema = z.object({
    id: z.string(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    createdTimestamp: z.number(),
    enabled: z.boolean(),
    totp: z.boolean(),
    disableableCredentialTypes: z.array(z.string()),
    requiredActions: z.array(z.string()),
    notBefore: z.number(),
    attributes: z.object({
        mobile_number: z.array(z.string()),
        userId: z.array(z.string()),
    }),
});

// Infer the TypeScript type from the user data Zod schema
export type IUser = z.infer<typeof IUserSchema>;
