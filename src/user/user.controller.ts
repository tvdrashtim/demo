import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Users } from './user.entity';
import { UserService } from './user.service';
import CreateUserDto, { UpdateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<Users> {
        console.log("user inserted with id",createUserDto);
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<Users[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Users> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        console.log("user removed of id",id);
        return this.usersService.remove(id);
    }

    @Put(':id')
    updateUser(@Body() updateUserDto: UpdateUserDto){
        console.log("user updated of id", updateUserDto);
        return this.usersService.update(updateUserDto);
    }
}
