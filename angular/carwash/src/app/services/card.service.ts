import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/cards/card.model';
import { CardList } from '../models/cards/cardList.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  apiUrl = 'https://localhost:7060/api/Cards';

  constructor(private http: HttpClient) { }

  getCards(): Observable<CardList[]> {
    return this.http.get<CardList[]>(`${this.apiUrl}/GetCards`);
  }

  createCard(card: Card): Observable<any> {
    return this.http.post<Card>(`${this.apiUrl}/CreateCard`, card);
  }
}
