import { IsString} from "class-validator";

export default class CreateUserDto{
    @IsString()
    firstname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    firstname: string;

    @IsString()
    email: string;

    @IsString()
    password: string;
  }