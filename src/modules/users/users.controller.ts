import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

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
    constructor(private readonly usersService: UsersService) {}
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
}
