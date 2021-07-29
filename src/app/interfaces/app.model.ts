export interface EmpInterface {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    salary: number;
    action?:ActionInterface
}

export interface EmpDataInterface {
    employee:Array<EmpInterface>
}

export interface ActionInterface {
    edit?:string;
    delete?:string
}

export interface DailogInterface {
    empDetails : EmpInterface;
}