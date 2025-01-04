import { User } from '@db/schema';
import { Model } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IBaseRepository } from '@shared/interfaces';

@Injectable()
export class UsersRepository implements IBaseRepository<User> {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    /**
     * All the database realted processes which realted to user creation define here.
     * @param entity
     * @returns
     */
    async create(entity: Partial<User>): Promise<User> {
        try {
            const createdUser = new this.userModel(entity);
            //
            const result = await createdUser.save();
            //
            return result;
        } catch (error) {
            if (error.code === 11000) {
                throw new BadRequestException('Username already exists');
            }
        }
    }
    /**
     * All the database processes which realted users fetching define here
     * @param filters
     * @returns
     */
    async findAll(filters: object | null = {}): Promise<User[]> {
        return this.userModel.find(filters).exec();
    }
    /**
     * All the detabase process which realted to users update define here
     * @param id
     * @param entity
     * @returns
     */
    async update(id: string, entity: Partial<User>): Promise<User | null> {
        return this.userModel
            .findByIdAndUpdate(id, entity, { new: true })
            .exec();
    }
    /**
     * Getting user by ID function define here.
     * @param id
     * @returns
     */
    async findOne(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }
}
