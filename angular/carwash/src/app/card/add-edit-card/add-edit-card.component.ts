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
    
  }

}
