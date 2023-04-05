import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    name: string;
    technology: string;

    @IsNumber()
    age: number;
}