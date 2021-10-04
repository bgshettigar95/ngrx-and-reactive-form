import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {

  columnDefs = [
    { headerName: "FirstName", field: "firstName", sortable: true, filter: true,width:100},
    { headerName: "LastName", field: "lastName", sortable: true, filter: true,width:100},
    { headerName: "Email", field: "email", sortable: true, filter: true,width:100 },
    { headerName: "Experience", field: "experience", sortable: true, filter: true,width:100 },
  ];

  rowData: Employee[];

  @ViewChild('agGrid') agGrid: AgGridAngular;

  constructor(private employeeService:EmployeeService,
    private store:Store<{employeeList:{employees:Employee[]}}>) { }

  ngOnInit(): void {

    this.store.select('employeeList').subscribe(data=> this.rowData = data.employees);
    // this.employeeService.getEmployees().subscribe((data: Employee[]) => {
    //   this.rowData = data;
    // });
  }

  getSelectedRows() {
    return this.agGrid.api.getSelectedRows();
  }

  onRowSelected() {
    this.employeeService.selectedEmployee.next(this.agGrid.api.getSelectedRows()[0])
    console.log(this.agGrid.api.getSelectedRows()[0]);
  }

}
