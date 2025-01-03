import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '@config/database-config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // This will help to accessible throughout the application
            cache: true, // This will help for the improve performance
            load: [databaseConfig], // Load all the defined configuration
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
