import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customers/customer.model';
import { CustomerList } from '../models/customers/customerList.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:7060/api/Customers'

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerList[]> {
    return this.http.get<CustomerList[]>(`${this.apiUrl}/GetCustomers`)
  }
}
