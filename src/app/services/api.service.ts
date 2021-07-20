import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  empUrl} from 'src/environments/environment';
import { EmpInterface } from "../interfaces/app.model";

@Injectable({
    providedIn: 'root'
  })
export class ApiService{
    
    private httpHeaders : HttpHeaders = new HttpHeaders({"content-type": "json"}); 

    constructor(private http: HttpClient){}

    getEmpData(){
        return this.http.get(empUrl);
    }

    postData(body: EmpInterface) {
        return this.http.post<any>(empUrl, body, { ...this.httpHeaders });
    }

    updateData(body: EmpInterface, id:number) {
        return this.http.put<any>(empUrl + id, body, {...this.httpHeaders});
    }

    deleteData(id:number){
        return this.http.delete(empUrl+id);
    }
}