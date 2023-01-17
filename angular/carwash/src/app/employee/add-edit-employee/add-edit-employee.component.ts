import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMod.enum';
import { Employee } from 'src/app/models/employees/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css']
})
export class AddEditEmployeeComponent implements OnInit{

  employeeId!: number;
  employee?: Employee;
  employeeForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;


  constructor (
    private employeeSvc: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.setEmployeeId();
    this.setPageMode();

    this.buildForm();

    if( this.pageMode == PageMode.Edit)
    {
      this.loadEmployee();
    }
    
  }

  submitForm(): void {
    if(this.employeeForm.valid)
    {
      if(this.pageMode == PageMode.Create)
      {
        this.employeeSvc.createEmployee(this.employeeForm.value).subscribe({
          next: () => {
            this.router.navigate(['/employees']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }else {
        this.employeeSvc.editEmployee(this.employeeId, this.employeeForm.value).subscribe({
          next: () => {
            this.router.navigate(['/employees']);
          },
          error: (e:HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }
    }
  }
  

  //#region privates
  private buildForm() {
    this.employeeForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(10)
      ])],
      lastName: ['', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(10)
      ])]
    });
  }

  private setEmployeeId() {
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  private setPageMode() {
    if(this.employeeId)
    {
      this.pageMode = PageMode.Edit;
    }
  }

  private loadEmployee() {
    this.employeeSvc.getEmployee(this.employeeId).subscribe({
      next: (employeeFromApi) => {
        this.employee = employeeFromApi;
        this.employeeForm.patchValue(employeeFromApi);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    });
  }
  //#endregion
}
