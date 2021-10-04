import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './models/employee';
import * as EmpoyeeList from "./employee.action";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:8080/';
  selectedEmployee = new BehaviorSubject<Employee | null>(null);
  updateMode:boolean = false;
  currentEmp:Employee;
  constructor(private http: HttpClient,
    private store:Store<{employeeList:{employees:Employee[]}}>) { }

  getEmployees() {
    return this.http.get<Employee[]>(this.url + 'employees');
  }

  addEmployee(employeeData: any) {

    console.log(employeeData);
    console.log(this.url + 'addEmployees');

    return this.http.post(this.url + 'addEmployees', employeeData);

  }

  updateEmployee(employeeData:Employee) {

    return this.http.post(this.url + 'updateEmployee'+'/'+ employeeData.id, employeeData);
  }

  deleteEmployee() {

    this.selectedEmployee.subscribe((data) => {
     this.currentEmp=data as Employee;
    });

    this.store.dispatch(new EmpoyeeList.DeleteEmployee(this.currentEmp.id));

    // console.log(this.currentEmp);
    // console.log(this.url + 'deleteEmployee' + '/' + this.currentEmp.id);
    // return this.http.delete(this.url + 'deleteEmployee' + '/' + this.currentEmp.id);
  }
}
