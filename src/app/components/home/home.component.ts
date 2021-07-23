import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { MatDialog} from '@angular/material/dialog'
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private sub = new Subject();

  employeeDetails: EmpInterface[]  =<any>[];

  constructor(private appService : ApiService,private dailog : MatDialog) { }

  searchText : string = '';

  private deletDailogDef: any;

  ngOnInit(): void {
     this.getEmpData();
  }

  getEmpData(){
    this.appService.getEmpData().pipe(takeUntil(this.sub)).subscribe( resp =>{
         this.employeeDetails = (resp as EmpInterface[]).sort((prev, next) =>{return next.id -prev.id});
    })
  }

  openDialog(empDetails? : EmpInterface){
    let dialogRef = empDetails ? this.dailog.open(EmployeeModalComponent,{data:{empDetails}, width:'40%', height:'80vh'}) : this.dailog.open(EmployeeModalComponent,{data:{}, width:'40%', height:'80vh'});
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
