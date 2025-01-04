import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min,
} from 'class-validator';

/**
 * @fileoverview Here is the define use request DTO file , For validation
 * using class validator and for the mapping using auto mapper
 */
export class CreateExpenseRequestDto {
    @IsNotEmpty({
        message: 'Expenses name can not be empty',
    })
    @IsString({
        message: 'Expenses name must be a string',
    })
    name: string;

    @IsNotEmpty({
        message: 'Expenses description can not be empty',
    })
    @IsString({
        message: 'Expenses description must be a string',
    })
    description: string;

    @IsNumber()
    @IsNotEmpty({
        message: 'Expenses amount can not be empty',
    })
    @Min(1)
    amount: number;

    @IsDateString()
    @IsNotEmpty({
        message: 'Date can not be empty',
    })
    date: Date;
}
