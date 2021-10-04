import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';

const routes: Routes = [
  {path: '', component: EmployeeTableComponent},
  {path: 'employee-table', component: EmployeeTableComponent},
  {path: 'employee-form', component: EmployeeFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
