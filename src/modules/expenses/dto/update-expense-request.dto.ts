import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

/**
 * @fileoverview Here define the update DTO file
 */
export class UpdateExpenseRequestDto {
    @IsNotEmpty({
        message: 'Expenses name can not be empty',
    })
    @IsString({
        message: 'Expenses name must be a string',
    })
    @IsOptional()
    name: string;

    @IsNotEmpty({
        message: 'Expenses description can not be empty',
    })
    @IsString({
        message: 'Expenses description must be a string',
    })
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty({
        message: 'Expenses amount can not be empty',
    })
    @Min(1)
    @IsOptional()
    amount: number;

    @IsDateString()
    @IsNotEmpty({
        message: 'Date can not be empty',
    })
    @IsOptional()
    date: Date;
}
