import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderConfig } from 'src/app/directive/image-uploader/image-uploader.config';
import { UploaderStyle, UploaderMode, UploaderType } from 'src/app/directive/image-uploader/uploader.enums';
import { UploaderImage } from 'src/app/directive/image-uploader/UploaderImage.data';
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

  images: UploaderImage[] = [];

  uploaderConfig = new ImageUploaderConfig(UploaderStyle.Normal, UploaderMode.Details, UploaderType.Multiple);

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
        next: (customerFromApi: CustomerDetails) => {
          this.customer = customerFromApi;

          if(customerFromApi.images) {
            this.images = customerFromApi.images;
          }
        },
        error: (e: HttpErrorResponse) => {
          console.log(e.message);
          this.router.navigate(['/not-found']);
        }
      });
    }
  }

}
