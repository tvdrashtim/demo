import { IsString} from "class-validator";

export default class CreateUserDto{
    @IsString()
    email: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
  }