import { DatabaseModule } from '@db/datastore.module';

import { Module } from '@nestjs/common';

import { ExpensesModule } from '@modules/expenses/expenses.module';
import { KeycloakModule } from '@modules/keycloak/keycloak.module';

import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [DatabaseModule, ExpensesModule, KeycloakModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository], // Here put the repository and service for internal purposes
})
//
export class UsersModule {}
