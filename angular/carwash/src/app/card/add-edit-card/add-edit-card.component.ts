import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enums/pageMod.enum';
import { PaymentMethod } from 'src/app/enums/paymentMethod.enum';
import { Card } from 'src/app/models/cards/card.model';
import { Lookup } from 'src/app/models/lookup.model';
import { CarService } from 'src/app/services/car.service';
import { CardService } from 'src/app/services/card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { WashService } from 'src/app/services/wash.service';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.css']
})
export class AddEditCardComponent implements OnInit{

  cardId!: number;
  card!: Card;
  cardForm!: FormGroup;
  paymentMethodEnum = PaymentMethod;

  pageMode: PageMode = PageMode.Create;
  pageModeEnum = PageMode;

  customerLookup!: Lookup[];
  carLookup!: Lookup[];
  employeeLookup!: Lookup[];
  washLookup!: Lookup[];

  totalPrice: number = 0;
  

  constructor (
    private cardSvc: CardService,
    private customerSvc: CustomerService,
    private carSvc: CarService,
    private employeeSvc: EmployeeService,
    private washSvc: WashService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {

    this.setCardId();
    this.setPageMode();

    this.buildForm();

    if(this.cardId)
    {
      this.loadCard();
    }

    this.loadCustomerLookup();
    this.loadCarLookup();
    this.loadEmployeeLookup();
    this.loadWashLookup();
    
  }

  
  get washId(): number {
    return Number(this.cardForm.controls['washId'].value);
  }

  updatePrice(): void {
    if(this.canUpdatePrice())
    {
      console.log("UpdatePrice Invoked");

      this.cardSvc.getWashPrice(this.washId).subscribe({
        next: (totalPriceFromApi: number) => {
          this.totalPrice = totalPriceFromApi;
        }
      });
    }
  }

  
  submitForm(): void {
   
    if(this.cardForm.valid)
    {
      if(this.pageMode == PageMode.Create)
      {
        this.cardSvc.createCard(this.cardForm.value).subscribe({
          next: () => {
            this.router.navigate(['/cards']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }else {
        this.cardSvc.editCard(this.cardId, this.cardForm.value).subscribe({
          next: () => {
            this.router.navigate(['/cards']);
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }
    }

  }

  


  

  
  //#region privates

  private setCardId() {
    this.cardId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  private setPageMode() {
    if(this.cardId)
    {
      this.pageMode = PageMode.Edit;
    }
  }

  private buildForm() {
    this.cardForm = this.fb.group({
      id: [0],
     // actionDate: [''],
      paymentMethod: [''],
      customerId: [''],
      carId: [''],
      washId: [''],
      employeeId: ['']

    });
  }

  private loadCard() {
    this.cardSvc.getEditCard(this.cardId).subscribe({
      next: (cardFromApi) => {
        this.card = cardFromApi;
        this.cardForm.patchValue(cardFromApi);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    });
  }

  private loadCustomerLookup() {
    this.customerSvc.getCustomerLookup().subscribe({
      next: (customerLookupFromApi) => {
        this.customerLookup = customerLookupFromApi;
      }
    });
  }

  private loadCarLookup() {
    this.carSvc.getCarLookup().subscribe({
      next: (carLookupFromApi) => {
        this.carLookup = carLookupFromApi;
      }
    });
  }

  private loadEmployeeLookup() {
    this.employeeSvc.getEmployeeLookup().subscribe({
      next: (employeeLookupFromApi) => {
        this.employeeLookup = employeeLookupFromApi;
      }
    });
  }

  private loadWashLookup() {
    this.washSvc.getWashLookup().subscribe({
      next: (washLookupFromApi) => {
        this.washLookup = washLookupFromApi;
      }
    });
  }

  private canUpdatePrice(): boolean {
    return this.washId != 0;
  }
  //#endregion

}
