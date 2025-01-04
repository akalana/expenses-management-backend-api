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
     *
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
     *
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
     *
     * @param id
     * @returns
     */
    findOne(userId: string, id: string) {
        return this.expensesRepository.findOne(id, {
            userId: new Types.ObjectId(userId),
        });
    }
    /**
     *
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
     *
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
