import { IsString} from "class-validator";

export default class CreateUserDto{
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;
}

export class UpdateUserDto {
    @IsString()
    firstname: string;

    @IsString()
    lastname: string;
  }