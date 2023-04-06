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
        user.email = createUserDto.email;
        user.password = createUserDto.password;
    
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

    // update(updateUserDto: UpdateUserDto): Promise<Users>{
    //     const newUser = new Users;
    //     newUser.firstname = updateUserDto.firstname;
    //     newUser.lastname = updateUserDto.lastname;
    //     return this.usersRepository.save(newUser);
    // }

    async update(id: number, attrs: Partial<Users>) {
        const user = await this.findOne(id);
        if (!user) {
          throw new Error('user not found');
        }
        Object.assign(user, attrs);
        return this.usersRepository.save(user);
      }
}
