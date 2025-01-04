import { DatabaseModule } from '@db/datastore.module';

import { Module } from '@nestjs/common';

import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository], // Here put the repository and service for internal purposes
})
//
export class UsersModule {}
