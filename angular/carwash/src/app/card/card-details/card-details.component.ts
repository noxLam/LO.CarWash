import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethod } from 'src/app/enums/paymentMethod.enum';
import { CardDetails } from 'src/app/models/cards/cardDetails.model';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit{

  cardId!: number;
  card!: CardDetails;

  paymentMethod = PaymentMethod;


  constructor (
    private cardSvc: CardService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.loadCard();
    
  }


  private loadCard() {
    this.cardId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
    if(this.cardId)
    {
      this.cardSvc.getCard(this.cardId).subscribe({
        next: (cardFromApi) => {
          this.card = cardFromApi;
        },
        error: (e: HttpErrorResponse) => {
          console.log(e);
          alert(e.message);
        }
      });
    }
  }
}
