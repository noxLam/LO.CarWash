import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMod.enum';
import { Customer } from 'src/app/models/customers/customer.model';
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

  }
  private buildForm() {
    this.customerForm = this.fb.group({
      id: [0],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      carIds: [[]]
    });
  }


  private setCustomerId() {
    this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  private setPageMode() {
    if(this.customerId)
    {
      this.pageMode = PageMode.Edit;
    }
  }
  
}
