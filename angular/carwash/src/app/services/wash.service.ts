import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WashList } from '../models/washes/washList.model';

@Injectable({
  providedIn: 'root'
})
export class WashService {

  apiUrl = 'https://localhost:7060/api/Washes';

  constructor(private http: HttpClient) { }

  getWashes(): Observable<WashList[]> {
    return this.http.get<WashList[]>(`${this.apiUrl}/GetWashes`);
  }
}
