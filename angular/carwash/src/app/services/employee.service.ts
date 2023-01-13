import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeList } from '../models/employees/employeeList.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'https://localhost:7060/api/Employees';

  constructor(private http: HttpClient) { }

  getEmloyees(): Observable<EmployeeList[]> {
    return this.http.get<EmployeeList[]>(`${this.apiUrl}/GetEmployees`);
  }
}
