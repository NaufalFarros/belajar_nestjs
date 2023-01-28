import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/users.dtos';
import { request } from 'http';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    getUsers() {
        return this.userRepository.find();
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create(createUserDto);
        return this.userRepository.save(newUser);
    }
    
 async findUsersById(id: number): Promise<User|undefined>{
        return this.userRepository.findOne({
            select: ['id', 'username', 'email', 'password'],
            where: [{ id: id }],
        });
    }
}