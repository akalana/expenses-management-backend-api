import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common/enums';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    // Enable CORS for application
    app.enableCors();

    // Enable API versioning for future purpose (Because sometimes if the version increment then this easy to mange)
    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'api/v',
    });
    //
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true, // Throw error message if we provide non whitelist attribute
            transform: true, // Transforms payloads to DTO instances
            errorHttpStatusCode: 400, // Define the error code
            exceptionFactory: errors => {
                const messages = errors.map(
                    error =>
                        `${error.property} - ${Object.values(error.constraints).join(', ')}`,
                );
                return new BadRequestException(messages.join('; '));
            },
        }),
    );

    //
    await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
