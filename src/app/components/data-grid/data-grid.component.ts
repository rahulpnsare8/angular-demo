import { ElementRef, OnDestroy, Renderer2,Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { MatDialog} from '@angular/material/dialog'
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

export interface UserDetails {
  userId: number;
  firstName: string;
  lastName:string;
  email: string;
  mobile: number;
  salary: number;
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements  OnDestroy {
  
  private sub = new Subject();

  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email', 'mobile', 'salary', 'action'];

  dataSource!: MatTableDataSource<EmpInterface>;

  @ViewChild('EmployeePaginator') paginator!: MatPaginator;

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  private deletDailogDef: any;

  constructor(private appService : ApiService, private dailog : MatDialog, private el: ElementRef, private ren: Renderer2) {
    this.getEmpData();
  }

  ngOnInit() {
   
  }

  filterData(event :any){
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getEmpData(){
    this.appService.getEmpData().pipe(takeUntil(this.sub)).subscribe( resp =>{
        const response = (resp as EmpInterface[]).map((val)=>{
          const action ={
            edit:"Edit",
            delete:"Delete"
          }
          const result = {...val, action};
          return result;
        });

        this.dataSource = new MatTableDataSource(response as EmpInterface[]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  edit(empDetails : EmpInterface){
    this.openDialog(empDetails);
  }

  delete(id:number){
    this.appService.deleteData(id).pipe(takeUntil(this.sub)).subscribe({
      next:res=>{
        //this.deletDailogDef.close();
        this.getEmpData()
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
