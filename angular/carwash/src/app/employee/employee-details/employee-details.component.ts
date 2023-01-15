import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employees/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{

  employeeId!: number;
  employee?: Employee;

  constructor (
   private employeeSvc: EmployeeService,
   private activatedRoute: ActivatedRoute,
   private router: Router
  ) {}

  ngOnInit(): void {

    this.loadEmployee();
    
  }


  private loadEmployee() {
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if(this.employeeId)
    {
      this.employeeSvc.getEmployee(this.employeeId).subscribe({
        next: (employeeFromApi) => {
          this.employee = employeeFromApi;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          alert(e.message);
        }
      });
    }
  }

}
