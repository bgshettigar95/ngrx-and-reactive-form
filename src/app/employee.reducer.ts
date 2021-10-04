import { Action } from "@ngrx/store";
import * as EmpoyeeList from "./employee.action";
import { Employee } from "./models/employee";


const initialState={
    employees:[
        { id: 1, firstName: "John", lastName: 'Doe', email: "john@gmail.com", experience: 'Fresher' },
        { id: 2, firstName: "Nisha", lastName: 'Sahu', email: "nisha@gmail.com", experience: 'Fresher' },
    ]
}
export function employeeReducer(state=initialState,
    action:EmpoyeeList.EmployeeListActions){

    switch(action.type){
        case EmpoyeeList.ADD_EMPLOYEE:
            console.log(action.payload);
            let newEmployee={...action.payload,
            id:state.employees.length+1}
            console.log([...state.employees,newEmployee]);
            return {
                ...state,
                employees:[...state.employees,newEmployee]
            };

        case EmpoyeeList.UPDATE_EMPLOYEE:
            const employee= state.employees[action.payload.id-1];
            const updatedEmployee={
                ...action.payload.employee
            }
            const updatedEmployees:Employee[]=[...state.employees];
            updatedEmployees[action.payload.id-1]=updatedEmployee;
            return{
                ...state,
                employees:updatedEmployees
            }

        case EmpoyeeList.DELETE_EMPLOYEE:
            return{
                ...state,
                employees: state.employees.filter((emp, index) => {
                    return index != action.payload-1;
                })
            }
        default:
            return state;
    }

}