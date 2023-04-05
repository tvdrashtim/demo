import { Injectable } from '@nestjs/common';
import { Employee } from './interfaces/employee.interface';

@Injectable()
export class EmployeeService {
    private readonly employees: Employee[] = [];

    create(employee: Employee){
        this.employees.push(employee);
    }

    findall(): Employee[]{
        return this.employees;
    }
}
