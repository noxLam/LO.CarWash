import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/cars/car.model';
import { CarList } from '../models/cars/carList.model';
import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = `${environment.apiUrl}/Cars`;

  constructor(private http: HttpClient) { }

  getCars(): Observable<CarList[]> {
    return this.http.get<CarList[]>(`${this.apiUrl}/GetCars`);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/GetCar/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiUrl}/CreateCar`, car);
  }

  editCar(id: number, car: Car): Observable<any> {
    return this.http.put<Car>(`${this.apiUrl}/EditCar/${id}`, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<Car>(`${this.apiUrl}/DeleteCar/${id}`);
  }

  getCarLookup(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${this.apiUrl}/GetLookup`)
  }
}
