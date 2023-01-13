import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeList } from '../models/employees/employeeList.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employees: EmployeeList[] = [];

  constructor (
    private employeeSvc: EmployeeService,
    ) {}

  ngOnInit(): void{

    this.loadEmployees();
    
  }


  private loadEmployees(): void {
    this.employeeSvc.getEmloyees().subscribe({
      next: (employeesFromApi) => {
        this.employees = employeesFromApi;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

}
