import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService{
    constructor(private userService: UserService) {}

    async signUp(email: string, password: string){
        //check email is in use
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException('email is already in use');
        }

        //salt and hashing password
        const salt = randomBytes(8).toString('hex');
        const hash =(await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        //create a new user
        const user = this.userService.create(email, result);

        //return a user
        return user;
    }

    async signIn(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) {
          throw new NotFoundException('user not found');
        }
    
        const [salt, storedHash] = user.password.split('.');
    
        const hash = (await scrypt(password, salt, 32)) as Buffer;
    
        if (storedHash !== hash.toString('hex')) {
          throw new BadRequestException('bad password');
        }
    
        return user;
      }
    }
