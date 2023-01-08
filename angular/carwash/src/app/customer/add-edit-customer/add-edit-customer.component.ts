import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMod.enum';
import { Customer } from 'src/app/models/customers/customer.model';
import { Lookup } from 'src/app/models/lookup.model';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {


  customerId?: number;
  customer?: Customer;
  customerForm!: FormGroup;
  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;
  carsLookup: Lookup[] = [];
  


  constructor(
    private customerSvc: CustomerService,
    private carSvc: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.setCustomerId();
    this.setPageMode();

    this.buildForm();

    this.loadCarsLookup();

    if(this.pageMode == PageMode.Edit)
    {
      this.loadCustomer();
    }

  }
  
  private buildForm() {
    this.customerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      carIds: [[]]
    });
  }


  submitForm(): void {
    if(this.customerForm.valid)
    {
      if(this.pageMode == PageMode.Create)
      {
        this.customerSvc.createCustomer(this.customerForm.value).subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e.error);
          }
        });
      }
      else{
        this.customerSvc.editCustomer(this.customerId!, this.customerForm.value).subscribe({
          next: () => {
            this.router.navigate(['/customers']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(`Error: ${e}`);
          }
        });
      }
    }
  }


  
 //#region privates
  private setCustomerId() {
    this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }
  
  private setPageMode() {
    if(this.customerId)
    {
      this.pageMode = PageMode.Edit;
    }
  }

  private loadCarsLookup(): void {
    this.carSvc.getCarLookup().subscribe({
      next: (carLookupFromApi) => {
        this.carsLookup = carLookupFromApi;
      }
    });
  }

  private loadCustomer() {
    this.customerSvc.getEditCustomer(this.customerId!).subscribe({
      next: (customerFromApi) => {
        this.customer = customerFromApi;
        this.customerForm.patchValue(customerFromApi);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

 //#endregion
  
}
