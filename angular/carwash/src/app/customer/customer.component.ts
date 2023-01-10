import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomerList } from '../models/customers/customerList.model';
import { DeleteDialogData } from '../models/deleteDialogData.model';
import { CustomerService } from '../services/customer.service';
import { DeleteCustomerComponent } from './dialogs/delete-customer/delete-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: CustomerList[] = [];
  showSpinner: boolean= true;

  constructor(
    private customerSvc: CustomerService,
    private dialogSvc: MatDialog
    ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }
  private loadCustomers(): void {
    this.customerSvc.getCustomers().subscribe({
      next: (customersFromApi) => {
        this.customers = customersFromApi;
        this.showSpinner = false;
      },
      error: (e: HttpErrorResponse) => {
        console.log(`Error ${e}`);
      }
    });
  }
  

  deleteCustomer(id: number, name: string): void {

    const dialogRef = this.dialogSvc.open(DeleteCustomerComponent, {
      data: {
        name: name,
      } as DeleteDialogData,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe({
      next: (answer: Boolean) => {
        if(answer)
        {
          this.showSpinner = true;
          this.customerSvc.deleteCustomer(id).subscribe({
            next: () => {
              this.loadCustomers();
            },
            error: (e: HttpErrorResponse) => {
              alert(e.message);
              console.log(e);
            }
          });
        }
      }
    });
  }

}
