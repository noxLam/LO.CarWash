import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customers/customer.model';
import { CustomerDetails } from '../models/customers/customerDetails.model';
import { CustomerList } from '../models/customers/customerList.model';
import { Lookup } from '../models/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:7060/api/Customers'

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerList[]> {
    return this.http.get<CustomerList[]>(`${this.apiUrl}/GetCustomers`);
  }

  getCustomer(id: number): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(`${this.apiUrl}/GetCustomer/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/CreateCustomer`,customer);
  }

  getEditCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/GetEditCustomer/${id}`);
  }

  editCustomer(id: number, customer: Customer): Observable<any> {
    return this.http.put<Customer>(`${this.apiUrl}/EditCustomer/${id}`,customer);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteCustomer/${id}`)
  }
 
  getCustomerLookup(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${this.apiUrl}/GetLookup`);
  }
 
}
