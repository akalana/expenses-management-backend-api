import { registerAs } from '@nestjs/config';

import { CONFIG_NAMESPACES } from '@shared/constants';
import { IKeycloakConfig } from '@shared/interfaces';

/**
 * Registers the Keycloak configuration using a specific namespace.
 * This configuration is accessible throughout the application using the defined namespace.
 */
export default registerAs(
    CONFIG_NAMESPACES.KEYCLOAK,
    (): IKeycloakConfig => ({
        kcBaseUrl: process.env.KC_BASE_URL,
        kcRealm: process.env.KC_REALM,
        kcWebClientId: process.env.KC_WEB_CLIENT_ID,
        kcWebClientSecret: process.env.KC_WEB_CLIENT_SECRET,
    }),
);
