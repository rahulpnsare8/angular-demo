import { Component, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { MatDialog} from '@angular/material/dialog'
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { BaseModalComponent } from '../base-modal/base-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  private sub = new Subject();
  employeeDetails: EmpInterface[]  =<any>[];
  searchText : string = '';
  private deletDailogDef: any;

  public data :EmpInterface ={ id: 16,
    firstName: 'Rohit',
    lastName: 'Sharma',
    email: 'rohit.sharma@mail.com',
    mobile: 9867543223,
    salary: 45000};

  constructor(private appService : ApiService,private dailog : MatDialog) { 
    this.getEmpData();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getEmpData(){
    this.appService.getEmpData().pipe(takeUntil(this.sub)).subscribe( resp =>{
         this.employeeDetails = (resp as EmpInterface[]).sort((prev, next) =>{return next.id - prev.id});
    })
  }

  openDialog(empDetails? : EmpInterface){
    let dialogRef = empDetails ? this.dailog.open(BaseModalComponent,{data:{empDetails}, width:'40%', height:'80vh'}) : this.dailog.open(BaseModalComponent,{data:{}, width:'40%', height:'80vh'});
    dialogRef.componentInstance.rout = 'Home';
    dialogRef.componentInstance.component = EmployeeModalComponent;
    dialogRef.componentInstance.apiSuccess.pipe(takeUntil(this.sub)).subscribe((res)=>{
      if(res){
        dialogRef.close();
        this.getEmpData();
      }
    })
  }


  add(){
    this.openDialog();
  }

  handleEvent(event : any){
    if(event){
      this.getEmpData();
    }
  }

  
  
}
