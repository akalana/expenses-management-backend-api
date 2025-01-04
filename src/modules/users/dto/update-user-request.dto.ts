import { IsNumber, Min } from 'class-validator';

/**
 * @fileoverview This file define the update
 */
export class UpdateUserRequestDto {
    @IsNumber()
    @Min(0)
    maxExpensesLimit: number;
}
