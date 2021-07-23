import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { Subject } from 'rxjs';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input()
  data! :EmpInterface;

  private sub = new Subject();

  employeeDetails: EmpInterface[]  =<any>[];

  private deletDailogDef: any;

  @Output() successEvent = new EventEmitter<any>();

  constructor(private appService : ApiService,private dailog : MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(empDetails? : EmpInterface){
    let dialogRef = empDetails ? this.dailog.open(EmployeeModalComponent,{data:{empDetails}, width:'40%', height:'80vh'}) : this.dailog.open(EmployeeModalComponent,{data:{}, width:'40%', height:'80vh'});
    dialogRef.componentInstance.apiSuccess.pipe(takeUntil(this.sub)).subscribe((res)=>{
      if(res){
        dialogRef.close();
        this.successEvent.emit(true);
      }
    })
  }

  edit(empDetails : EmpInterface){
    this.openDialog(empDetails);
  }

  delete(id:number){
    this.appService.deleteData(id).pipe(takeUntil(this.sub)).subscribe({
      next:res=>{
        this.successEvent.emit(true)
      },
      error: error =>{

      }
    })
  }

  confirmDelete(id : number){
    this.deletDailogDef = this.dailog.open(ConfirmDeleteComponent);
    this.deletDailogDef.componentInstance.apiSuccess.pipe(takeUntil(this.sub)).subscribe((res :boolean)=>{
      if(res){
        this.delete(id);
      }
    })
  }

}
