import { DatabaseModule } from '@db/datastore.module';

import { Module } from '@nestjs/common';

import {
    CreateExpenseRequestDto,
    ListExpenseRequestDto,
    UpdateExpenseRequestDto,
} from './dto';
import { ExpensesService } from './expenses.service';
import { ExpensesRepository } from './repositories/expenses.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        ExpensesService,
        ExpensesRepository,
        CreateExpenseRequestDto,
        UpdateExpenseRequestDto,
        ListExpenseRequestDto,
    ],
    exports: [
        ExpensesService,
        CreateExpenseRequestDto,
        UpdateExpenseRequestDto,
        ListExpenseRequestDto,
    ],
})
export class ExpensesModule {}
