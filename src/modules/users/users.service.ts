import { User } from '@db/schema';

import { Injectable } from '@nestjs/common';

import { KeycloakService } from '@modules/keycloak/keycloak.service';

import {
    CreateUserRequestDto,
    ListUsersRequestDto,
    UpdateUserRequestDto,
} from './dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly keycloakService: KeycloakService,
    ) {}
    /**
     * Define all the business logics realted to user creation process
     * @param createUserRequestDto
     * @returns
     */
    async create(createUserRequestDto: CreateUserRequestDto): Promise<User> {
        try {
            console.log(createUserRequestDto);
            const user = await this.keycloakService.getUser(
                createUserRequestDto.username,
            );
            //
            return this.userRepository.create({
                ...createUserRequestDto,
                sub: user.id,
            });
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Define all the business logics and values transformations reagarding user listing
     * @param listUsersRequestDto
     * @returns
     */
    findAll(listUsersRequestDto: ListUsersRequestDto): Promise<User[]> {
        return this.userRepository.findAll(listUsersRequestDto);
    }
    /**
     * Define the user get by ID realted logics in here
     * @param id
     * @returns
     */
    findOne(id: string) {
        return this.userRepository.findOne(id);
    }
    /**
     * Define all the user update process realted things in here
     * @param id
     * @param updateUserRequestDto
     * @returns
     */
    update(id: string, updateUserRequestDto: UpdateUserRequestDto) {
        return this.userRepository.update(id, updateUserRequestDto);
    }
}
