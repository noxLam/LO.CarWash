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
    return this.http.get<CustomerList[]>(`${this.apiUrl}/GetCustomers`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/GetCustomer/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/CreateCustomer`,customer);
  }

  editCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put<Customer>(`${this.apiUrl}/EditCustomer/${id}`,customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<Customer>(`${this.apiUrl}/DeleteCustomer/${id}`)
  }
}
