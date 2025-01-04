import { Expense } from '@db/schema';
import { Model, ObjectId, Types } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IBaseRepository } from '@shared/interfaces';

@Injectable()
export class ExpensesRepository implements IBaseRepository<Expense> {
    constructor(
        @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    ) {}
    /**
     *
     * @param entity
     * @returns
     */
    async create(entity: Partial<Expense>): Promise<Expense> {
        try {
            const createdExpense = new this.expenseModel(entity);
            //
            const result = await createdExpense.save();
            //
            return result;
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException(
                    `Expense name already exists for this user ${entity.userId}`,
                );
            }
        }
    }
    /**
     *
     * @param filters
     * @returns
     */
    async findAll(
        filters: { date?: string; userId: ObjectId } | null,
    ): Promise<Expense[]> {
        const query: any = { ...filters };
        //
        if (filters?.date) {
            const date = new Date(filters.date);
            const firstMonthDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                1,
            );
            const lastMonthDate = new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0,
            );

            query.date = {
                $gte: firstMonthDate,
                $lte: lastMonthDate,
            };
        }
        return this.expenseModel.find(query).exec();
    }
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(
        id: string,
        entity: Partial<Expense>,
    ): Promise<Expense | null> {
        return this.expenseModel
            .findByIdAndUpdate(id, entity, { new: true })
            .exec();
    }
    /**
     *
     * @param id
     * @returns
     */
    async findOne(id: string, filters: object): Promise<Expense | null> {
        return this.expenseModel.findOne({ _id: id, ...filters }).exec();
    }
    /**
     *
     * @param id
     * @returns
     */
    async remove(id: string, filters: object): Promise<Expense | null> {
        return this.expenseModel
            .findOneAndDelete({
                _id: new Types.ObjectId(id),
                ...filters,
            })
            .exec();
    }
}
