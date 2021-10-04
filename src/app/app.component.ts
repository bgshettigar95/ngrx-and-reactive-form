import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngrx-demo';

  constructor(private router: Router, private employeeService:EmployeeService){

  }

  addEmp(){

    this.employeeService.updateMode=false;
    this.router.navigate(['/employee-form']);
  }

  updateEmp(){
    this.employeeService.updateMode=true;
    this.router.navigate(['/employee-form']);
    
  }

  deleteEmp(){
  
    this.employeeService.deleteEmployee();

  }
}
