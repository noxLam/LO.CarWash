import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employees/employee.model';
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

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/GetEmployee/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/CreateEmployee`, employee);
  }

  editEmployee(id: number, employee: Employee): Observable<any> {
    return this.http.put<Employee>(`${this.apiUrl}/EditEmployee/${id}`, employee);
  }

}
