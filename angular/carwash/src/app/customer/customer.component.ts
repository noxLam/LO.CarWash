import { Component, OnInit } from '@angular/core';
import { CustomerList } from '../models/customers/customerList.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: CustomerList[] = [];

  constructor(private customerSvc: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }
  private loadCustomers() {
    this.customerSvc.getCustomers().subscribe(
      customersFromApi => {
        this.customers = customersFromApi;

      }
    )
  }

}
