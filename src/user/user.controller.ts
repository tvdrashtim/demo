import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { Users } from './user.entity';
import { UserService } from './user.service';
import CreateUserDto, { UpdateUserDto } from './dto/create-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post()
    create(@Param('id') id:string,@Body() createUserDto: CreateUserDto): Promise<Users> {
        console.log("user inserted with id", createUserDto);
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    //     return this.usersService.findOne(id);
    // }


    // @UseInterceptors(ClassSerializerInterceptor)
    // @UseInterceptors(new SerializeInterceptor(UserDto))
    // @Serialize(UserDto)
    @Get(':id')
    async findOne(@Param('id') id:string){
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found');
        }
        return user;
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        console.log("user removed of id",id);
        return this.usersService.remove(id);
    }

    @Put(':id')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id:string) {
        console.log("user updated of id", id);
        return this.usersService.update(parseInt(id),updateUserDto);
    }
}
