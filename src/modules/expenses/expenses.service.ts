import { ObjectId, Types } from 'mongoose';

import { Injectable } from '@nestjs/common';

import {
    CreateExpenseRequestDto,
    ListExpenseRequestDto,
    UpdateExpenseRequestDto,
} from './dto';
import { ExpensesRepository } from './repositories/expenses.repository';

@Injectable()
export class ExpensesService {
    constructor(private expensesRepository: ExpensesRepository) {}
    /**
     * Expense creation process realted to things define here
     * @param createExpenseRequestDto
     * @returns
     */
    create(userId: string, createExpenseRequestDto: CreateExpenseRequestDto) {
        return this.expensesRepository.create({
            userId: new Types.ObjectId(userId),
            ...createExpenseRequestDto,
        });
    }
    /**
     * Expenses fetching related function define here. Based on the name and date can filter the expenses
     * @param userId
     * @param ListExpenseRequestDto
     * @returns
     */
    findAll(userId: string, ListExpenseRequestDto: ListExpenseRequestDto) {
        return this.expensesRepository.findAll({
            userId: new Types.ObjectId(userId) as unknown as ObjectId,
            ...ListExpenseRequestDto,
        });
    }
    /**
     * Getting details of the specific expense details based on the user id and expense id
     * @param id
     * @returns
     */
    findOne(userId: string, id: string) {
        return this.expensesRepository.findOne(id, {
            userId: new Types.ObjectId(userId),
        });
    }
    /**
     * Update the existing expense
     * @param id
     * @param updateExpenseDto
     * @returns
     */
    update(
        userId: string,
        id: string,
        updateExpenseDto: UpdateExpenseRequestDto,
    ) {
        return this.expensesRepository.update(id, {
            ...updateExpenseDto,
            userId: new Types.ObjectId(userId),
        });
    }
    /**
     * Delete expenses based on the user id and expense id
     * @param userId
     * @param id
     * @returns
     */
    remove(userId: string, id: string) {
        return this.expensesRepository.remove(id, {
            userId: new Types.ObjectId(userId),
        });
    }
}
