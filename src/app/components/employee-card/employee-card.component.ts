import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { Subject } from 'rxjs';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnDestroy{

  @Input()
  data! :EmpInterface;

  private sub = new Subject();

  @Output() successEvent = new EventEmitter<any>();

  msgString : string = '';

  constructor(private appService : ApiService,private dailog : MatDialog, private el: ElementRef, private ren: Renderer2) { 
    this.data ={ id: 0,
      firstName: '',
      lastName: '',
      email: '',
      mobile: 0,
      salary: 0};
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  openDialog(empDetails? : EmpInterface){
    let dialogRef = empDetails ? this.dailog.open(BaseModalComponent,{data:{empDetails}, width:'40%', height:'80vh'}) : this.dailog.open(BaseModalComponent,{data:{}, width:'40%', height:'80vh'});
    dialogRef.componentInstance.rout = 'Home';
    dialogRef.componentInstance.component = EmployeeModalComponent;
    dialogRef.componentInstance.apiSuccess.pipe(takeUntil(this.sub)).subscribe((res)=>{
      if(res){
        dialogRef.close();
        this.successEvent.emit(true);
        this.msgString = 'Success'; 
      }
    })
  }

  edit(empDetails : EmpInterface){
    this.openDialog(empDetails);
  }

  delete(id:number){
    this.appService.deleteData(id).pipe(takeUntil(this.sub)).subscribe({
      next:res=>{
        this.successEvent.emit(true);
        this.msgString = 'Success'; 
      },
      error: error =>{
        this.msgString = 'Failure'; 
      }
    })
  }

  confirmDelete(id : number){
    let deletDailogDef = this.dailog.open(ConfirmDeleteComponent);
    deletDailogDef.componentInstance.apiSuccess.pipe(takeUntil(this.sub)).subscribe((res :boolean)=>{
      if(res){
        this.delete(id);
      }
    })
  }

}
