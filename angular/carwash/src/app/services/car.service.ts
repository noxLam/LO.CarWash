import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/cars/car.model';
import { CarList } from '../models/cars/carList.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:7060/api/Cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<CarList[]> {
    return this.http.get<CarList[]>(`${this.apiUrl}/GetCars`);
  }
}
