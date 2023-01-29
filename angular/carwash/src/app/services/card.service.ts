import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeleteCardComponent } from '../card/dialogs/delete-card/delete-card.component';
import { Card } from '../models/cards/card.model';
import { CardDetails } from '../models/cards/cardDetails.model';
import { CardList } from '../models/cards/cardList.model';
import { Car } from '../models/cars/car.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = 'https://localhost:7060/api/Cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<CardList[]> {
    return this.http.get<CardList[]>(`${this.apiUrl}/GetCards`);
  }

  getCard(id: number): Observable<CardDetails> {
    return this.http.get<CardDetails>(`${this.apiUrl}/GetCard/${id}`);
  }

  createCard(card: Card): Observable<any> {
    return this.http.post<Card>(`${this.apiUrl}/CreateCard`, card);
  }

  getEditCard(id: number): Observable<Card> {
    return this.http.get<Card>(`${this.apiUrl}/GetEditCard/${id}`);
  }

  editCard(id: number, card: Card): Observable<any> {
    return this.http.put<Card>(`${this.apiUrl}/EditCard/${id}`, card);
  }

  getWashPrice(washId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/GetWashPrice?washId=${washId}`);
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete<Card>(`${this.apiUrl}/DeleteCard/${id}`);
  }
}
