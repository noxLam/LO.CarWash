import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetails } from 'src/app/models/customers/customerDetails.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  customer?: CustomerDetails;

  constructor (
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit(): void {
    
    this.loadCustomer();

  }


  private loadCustomer() {

    this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
   
    if(this.customerId)
    {
      this.customerSvc.getCustomer(this.customerId).subscribe({
        next: (customerFromApi) => {
          this.customer = customerFromApi;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.message);
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

}
