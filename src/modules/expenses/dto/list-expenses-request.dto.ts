import { IsDateString, IsOptional, IsString } from 'class-validator';

/**
 * @fileoverview Here we define the listing DTO file for filtering
 */
export class ListExpenseRequestDto {
    @IsOptional()
    @IsString({
        message: 'Expenses name must be a string',
    })
    name: string;

    @IsOptional()
    @IsDateString()
    date: string;
}
