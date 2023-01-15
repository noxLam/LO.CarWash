import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeList } from '../models/employees/employeeList.model';
import { EmployeeService } from '../services/employee.service';
import { DeleteEmployeeComponent } from './dialogs/delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{

  employees: EmployeeList[] = [];
  showSpinner: boolean = true;


  constructor (
    private employeeSvc: EmployeeService,
    private dialogSvc: MatDialog
    ) {}

  ngOnInit(): void{

    this.loadEmployees();
    
  }


  private loadEmployees(): void {
    this.employeeSvc.getEmloyees().subscribe({
      next: (employeesFromApi) => {
        this.employees = employeesFromApi;
        this.showSpinner = false;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    });
  }

  deleteEmployeee(id: number): void {
    let deleteDialogConfig: MatDialogConfig = {
      data: {
        employee: this.employees.find(e => e.id == id)
      },
      disableClose: true
    };

    const dialogRef = this.dialogSvc.open(DeleteEmployeeComponent, deleteDialogConfig);

    dialogRef.afterClosed().subscribe(result => {

      if(result == true)
      {
        this.showSpinner = true;

        this.employeeSvc.deleteEmployee(id).subscribe({
          next: () => {
            this.loadEmployees();
          }
        });
      }
    });
  }

}
