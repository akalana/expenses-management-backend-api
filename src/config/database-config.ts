import { registerAs } from '@nestjs/config';

import { CONFIG_NAMESPACES } from '@shared/constants';
import { IDBConfig } from '@shared/interfaces';

/**
 * This function registers a configuration namespace and supplies the corresponding configuration values (Database realted).
 * The configuration will be retrievable through the specified namespace.
 */
export default registerAs(
    CONFIG_NAMESPACES.DB, // Namespace for the database configuration
    (): IDBConfig => ({
        url: process.env.DATABASE_URL,
    }),
);
