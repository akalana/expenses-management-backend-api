import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import {
    CreateExpenseRequestDto,
    ListExpenseRequestDto,
    UpdateExpenseRequestDto,
} from '@modules/expenses/dto';
import { ExpensesService } from '@modules/expenses/expenses.service';

import {
    CreateUserRequestDto,
    ListUsersRequestDto,
    UpdateUserRequestDto,
} from './dto';
import { UsersService } from './users.service';

@Controller({
    version: '1', // Versioning your API
    path: 'users', // Base path for this controller
})
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly expensesService: ExpensesService,
    ) {}
    /**
     * This controller method define the getting request and sending response regarding user
     * creation process
     * @param createUserRequestDto
     * @returns
     */
    @Post()
    create(@Body() createUserRequestDto: CreateUserRequestDto) {
        return this.usersService.create(createUserRequestDto);
    }
    /**
     * This controller method define the getting request and sending response regarding user
     * listing process with filters
     * @param listUsersDto
     * @returns
     */
    @Get()
    findAll(@Query() listUsersDto: ListUsersRequestDto) {
        return this.usersService.findAll(listUsersDto);
    }
    /**
     * This controller method define the getting request and sending response regarding
     * specific users based on the ID
     * @param id
     * @returns
     */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }
    /**
     * This controller method define the getting request and sending response regarding user
     * update process
     * @param id
     * @param updateUserRequestDto
     * @returns
     */
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserRequestDto: UpdateUserRequestDto,
    ) {
        return this.usersService.update(id, updateUserRequestDto);
    }
    /**
     *
     * @param id
     * @param createExpenseRequestDto
     * @returns
     */
    @Post(':userId/expenses')
    createExpense(
        @Param('userId') userId: string,
        @Body() createExpenseRequestDto: CreateExpenseRequestDto,
    ) {
        return this.expensesService.create(userId, createExpenseRequestDto);
    }
    /**
     *
     * @param userId
     * @param id
     * @param updateExpenseRequestDto
     * @returns
     */
    @Patch(':userId/expenses/:id')
    updateExpense(
        @Param('userId') userId: string,
        @Param('id') id: string,
        @Body() updateExpenseRequestDto: UpdateExpenseRequestDto,
    ) {
        return this.expensesService.update(userId, id, updateExpenseRequestDto);
    }
    /**
     *
     * @param userId
     * @param id
     * @returns
     */
    @Delete(':userId/expenses/:id')
    deleteExpense(@Param('userId') userId: string, @Param('id') id: string) {
        return this.expensesService.remove(userId, id);
    }
    /**
     *
     * @param userId
     * @param listExpenseRequestDto
     * @returns
     */
    @Get(':userId/expenses')
    listOfExpenses(
        @Param('userId') userId: string,
        @Query() listExpenseRequestDto: ListExpenseRequestDto,
    ) {
        return this.expensesService.findAll(userId, listExpenseRequestDto);
    }
    /**
     *
     * @param userId
     * @param listExpenseRequestDto
     * @returns
     */
    @Get(':userId/expenses/:id')
    expensesById(@Param('userId') userId: string, @Param('id') id: string) {
        return this.expensesService.findOne(userId, id);
    }
}
