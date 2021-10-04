import { Action } from "@ngrx/store";
import { Employee } from "./models/employee";

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE';

export class AddEmployee implements Action {
    readonly type = ADD_EMPLOYEE;
    constructor(public payload: Employee) {

    }
}

export class UpdateEmployee implements Action {
    readonly type = UPDATE_EMPLOYEE;
    constructor(public payload: { id: number, employee: Employee }) {

    }
}

export class DeleteEmployee implements Action {
    readonly type = DELETE_EMPLOYEE;
    constructor(public payload: number) {

    }

}


export type EmployeeListActions = AddEmployee | UpdateEmployee | DeleteEmployee;