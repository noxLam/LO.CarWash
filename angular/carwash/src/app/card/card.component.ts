import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentMethod } from '../enums/paymentMethod.enum';
import { Card } from '../models/cards/card.model';
import { CardList } from '../models/cards/cardList.model';
import { CardService } from '../services/card.service';
import { DeleteCardComponent } from './dialogs/delete-card/delete-card.component';

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
    private dialogSvc: MatDialog

  ) {}

  ngOnInit(): void {

    this.loadCards();
    
  }

   deleteCard(id: number): void {
    let deleteDialogConfig: MatDialogConfig = {
      data: {
        card: this.cards.find(c => c.id == id)
      },
      disableClose: true
    };
    const dialogRef = this.dialogSvc.open(DeleteCardComponent, deleteDialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if(result == true)
      {
        this.showSpinner = true;
        this.cardSvc.deleteCard(id).subscribe({
          next: () => {
            this.loadCards();
          },
          error: (e: HttpErrorResponse) => {
            console.log(e);
            alert(e.message);
          }
        });
      }
    });
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
