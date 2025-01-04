import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { CONFIG_NAMESPACES } from '@shared/constants';
import { IDBConfig } from '@shared/interfaces';

import { Expense, ExpenseSchema, User, UserSchema } from './schema';

/**
 * @fileoverview Here I have defined the database connection for the mongoose, and also register
 * all the schemas into here
 */
@Module({
    imports: [
        ConfigModule, // Need to inject the cofig module, because for getting the databse url
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<IDBConfig>(CONFIG_NAMESPACES.DB).url,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Expense.name, schema: ExpenseSchema },
        ]),
    ],
    exports: [MongooseModule],
})
export class DatabaseModule {}
