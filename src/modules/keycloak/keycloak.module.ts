import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import keycloakConfig from '@config/keycloak-config';

import { KeycloakService } from './keycloak.service';

/**
 * KeycloakModule is responsible for integrating Keycloak with the application.
 * It includes the KeycloakService for handling Keycloak operations and
 * provides configuration and HTTP functionality required for Keycloak integration.
 */
@Module({
    imports: [
        HttpModule,
        ConfigModule.forRoot({
            load: [keycloakConfig],
        }),
    ],
    providers: [KeycloakService],
    exports: [KeycloakService],
})
export class KeycloakModule {}
