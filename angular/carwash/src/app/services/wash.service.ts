import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wash } from '../models/washes/wash.model';
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

  getWash(id: number): Observable<Wash> {
    return this.http.get<Wash>(`${this.apiUrl}/GetWash/${id}`);
  }

  createWash(wash: Wash): Observable<Wash> {
    return this.http.post<Wash>(`${this.apiUrl}/CreateWash`, wash);
  }

  editWash(id: number, wash: Wash): Observable<any> {
    return this.http.put<Wash>(`${this.apiUrl}/EditWash/${id}`, wash);
  }
}
