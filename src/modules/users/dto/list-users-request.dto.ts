import { IsOptional } from 'class-validator';

/**
 * @fileoverview User list with filtering DTO file.
 */
export class ListUsersRequestDto {
    @IsOptional()
    sub?: string;

    @IsOptional()
    username?: string;
}
