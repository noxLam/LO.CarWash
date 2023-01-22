import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { Card } from '../models/cards/card.model';
import { CardList } from '../models/cards/cardList.model';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  cards!: CardList[];
  paymentMethod = PaymentMethod;
  showSpinner: boolean = true;

  constructor (
    private cardSvc: CardService,

  ) {}

  ngOnInit(): void {

    this.loadCards();
    
  }


  private loadCards() {
    this.cardSvc.getCards().subscribe({
      next: (cardsFromApi) => {
        this.cards = cardsFromApi;
        this.showSpinner = false;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
        alert(e.message);
      }
    });
  }

}
