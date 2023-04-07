import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Session, UseInterceptors } from '@nestjs/common';
import { Users } from './user.entity';
import { UserService } from './user.service';
import CreateUserDto, { UpdateUserDto } from './dto/create-user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/decorators/current-user-decorator';

@Controller('users')
@Serialize(UserDto)
export class UserController {
    constructor(
        private usersService: UserService,
        private authService: AuthService
    ) { }

    // @Get('/whoami')
    // currentUser(@Param('id') id:number , @Session() session: any) {
    //     console.log("current user of id",id);
    //     return this.usersService.findOne(id);
    // }

    //use custom decorator
    @Get('/whoami')
    currentUser(@CurrentUser() user: string){
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    } 

    // @Post('/signup')
    // signup(@Body() body: CreateUserDto) {
    //     return this.authService.signUp(body.email, body.password);
    // }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password);
        // session.userId = user.id;
        return user;
    }

    // @Post('/signin')
    // signin(@Body() body: CreateUserDto) {
    //     return this.authService.signIn(body.email, body.password);
    // }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password);
        // session.userId = user.id;
        return user;
    }

    @Post()
    create(@Param('id') id:string,@Body() createUserDto: CreateUserDto): Promise<Users> {
        console.log("user inserted with id", createUserDto);
        return this.usersService.create(createUserDto.email,createUserDto.password);
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
