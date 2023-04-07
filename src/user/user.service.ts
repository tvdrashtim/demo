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

    create(email: string, password: string) {
        const user = this.usersRepository.create({email, password});
        
        return this.usersRepository.save(user);
      }
    

    findAll(): Promise<Users[]>{
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<Users>{
        if(!id){
            return null;
        }
        return this.usersRepository.findOneBy({id});
    }

    find(email: string) {
        return this.usersRepository.findBy({email});
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
