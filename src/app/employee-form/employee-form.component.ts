import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';
import * as EmpoyeeList from "../employee.action";
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  experience = ["Fresher", "Experienced"];
  employeeForm: FormGroup;
  
  constructor(private employeeService:EmployeeService, 
    private router: Router,
    private store:Store<{employeeList:{employees:Employee[]}}>) { }

  ngOnInit(): void {
    
    this.employeeForm = new FormGroup({
      'id':new FormControl(null),
      'firstName': new FormControl('',Validators.required),
      'lastName': new FormControl('',Validators.required),
      'email': new FormControl('',[Validators.required,Validators.email,emailDomain]),
      'experience': new FormControl('',Validators.required),
     
    });


    this.employeeService.selectedEmployee.subscribe(data=>{
      if(data){
        this.employeeForm.setValue({
          'id':data.id,
          'firstName': data.firstName,
          'lastName': data.lastName,
          'email':data.email,
          'experience': data.experience,
        });
      }
    });

    
  }

  onSubmit(){
  if(!this.employeeService.updateMode){

    console.log('Add Emp');
    this.store.dispatch(new EmpoyeeList.AddEmployee(this.employeeForm.value));
    this.router.navigate(['/employee-table']);

    // this.employeeService.addEmployee(this.employeeForm.value).subscribe(data => {console.log(data);
    //   this.router.navigate(['/employee-table']);
    // },
    // error=>{
    //   this.router.navigate(['/employee-table']);
    // });
  }
  else{

    this.store.dispatch(new EmpoyeeList.UpdateEmployee({id:this.employeeForm.value.id,employee:this.employeeForm.value}));
    this.router.navigate(['/employee-table']);
  //  this.employeeService.updateEmployee(this.employeeForm.value).subscribe(data => {console.log(data);
  //     this.router.navigate(['/employee-table']);
  //   },
  //   error=>{
  //     this.router.navigate(['/employee-table']);
  //   });
  }
  }

  onReset(){
    this.employeeForm.reset();
  }

}

function emailDomain(control: AbstractControl):{[key:string]:any} | null {

  const email:string= control.value;
 

  
    const domain =(email as string).slice(email.lastIndexOf('@')+1);
    if(email=='' || domain.toLowerCase() === 'gmail.com'){
      return null;
    }
    else{
      return {'emailDomain' : true}
    }
  
 
 
}
