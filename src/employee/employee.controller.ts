import { Controller, Get, Param, Post, HostParam, Body, Res, HttpStatus, Put, Delete, ParseIntPipe, HttpCode, Query } from '@nestjs/common';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { Response } from 'express';
import { EmployeeService } from './employee.service';
import { Employee } from './interfaces/employee.interface';

@Controller('employee')
export class EmployeeController {
    constructor(private employeeService: EmployeeService) {}

    @Get()
    findAll(): string {
        return 'This action returns all employees';
    }

    @Get('ab*ab')
    findAlls(): string {
        return `this will return wildcard route`;
    }

    @Get(':id')
    findOne(@Param('id',new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: string): string {
        return `This action returns ${id} employee`;
    }

    @Post()
    async create(@Body() createEmpoyeeDto: CreateEmployeeDto) {
        return 'this action adds employee';
    }

    @Get()
    findAny(@Res() res: Response) {
        res.status(HttpStatus.OK).json([]);
    }

    @Put(':id')
    update(@Param('id') id:string) {
        return `this action updates ${id} employee`;
    }

    @Delete()
    removeUser(@Query('id') id:number) {
        console.log("delete",id);
        return `Removes a #${id} number of user`;
    }

    //////after adding service
    // @Post()
    // async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    //     return this.employeeService.create(createEmployeeDto);
    // }

    // @Get()
    // async findAll(): Promise<Employee[]> {
    //     return this.employeeService.findall();
    // }

}
