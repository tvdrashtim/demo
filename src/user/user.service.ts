import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import CreateUserDto, { UpdateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private usersRepository : Repository<Users>,
    ){}

    create(createUserDto: CreateUserDto): Promise<Users> {
        const user = new Users();
        user.firstname = createUserDto.firstname;
        user.lastname = createUserDto.lastname;
    
        return this.usersRepository.save(user);
      }
    

    findAll(): Promise<Users[]>{
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<Users>{
        return this.usersRepository.findOneBy({id});
    }

    async remove(id:string): Promise<void>{
        await this.usersRepository.delete(id);
    }

    update(updateUserDto: UpdateUserDto): Promise<Users>{
        const newUser = new Users;
        newUser.firstname = updateUserDto.firstname;
        newUser.lastname = updateUserDto.lastname;
        return this.usersRepository.save(newUser);
    }
}
