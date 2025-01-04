import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

/**
 * @fileoverview Here is the define use request DTO file , For validation
 * using class validator and for the mapping using auto mapper
 */
export class CreateUserRequestDto {
    @IsNotEmpty({
        message: 'Username can not be empty',
    })
    @IsString({
        message: 'Username must be a string',
    })
    username: string;

    @IsNotEmpty({
        message: 'First name can not be empty',
    })
    @IsString({
        message: 'First name must be a string',
    })
    firstName: string;

    @IsString({
        message: 'First name must be a string',
    })
    @IsOptional()
    lastName: string;

    @IsUUID('4', {
        message: 'UserId must be a valid UUID',
    })
    @IsOptional()
    sub: string;
}
