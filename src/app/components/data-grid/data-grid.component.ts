import { AfterViewChecked,ElementRef, OnDestroy, Renderer2,Component, OnInit, ViewChild} from '@angular/core';
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

const ELEMENT_DATA: UserDetails[] = [
  {userId: 1, firstName: 'Rahul', lastName: 'Pansare', email: 'rahul.pansare@xyz.com',mobile: 8976543232, salary: 20000},
  {userId: 2, firstName: 'Mahesh', lastName: 'Surve', email: 'mahesh.surve@xyz.com',mobile: 9087654321, salary: 40000},
  {userId: 3, firstName: 'Rohit', lastName: 'Sharma', email: 'rohit.sharma@xyz.com',mobile: 7865432132, salary: 30000},
  {userId: 4, firstName: 'Virat', lastName: 'Kohali', email: 'virat.kohali@xyz.com',mobile: 8912346587, salary: 30000},
  {userId: 5, firstName: 'Suraj', lastName: 'Kaudgave', email: 'suraj.kaudgave@xyz.com',mobile: 8734234523, salary: 50000},
  {userId: 6, firstName: 'Suresh', lastName: 'Raina', email: 'suresh.raina@xyz.com',mobile: 9654232145, salary: 60000},
  {userId: 7, firstName: 'MS', lastName: 'Dhoni', email: 'ms.dhoni@xyz.com',mobile: 9123456798, salary: 70000},
  {userId: 8, firstName: 'Hardik', lastName: 'Pandya', email: 'hardik.pandya@xyz.com',mobile: 7965342345, salary: 80000},
  {userId: 9, firstName: 'Krunal', lastName: 'Pandya', email: 'krunal.pandya@xyz.com',mobile: 8632546787, salary: 90000},
  {userId: 10, firstName: 'David ', lastName: 'Warner', email: 'david.warner@xyz.com',mobile: 765423456, salary: 10000}

];

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements AfterViewChecked, OnDestroy {
  
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

  
  //dataSource =new MatTableDataSource<UserDetails>(ELEMENT_DATA);

  // @ViewChild(MatPaginator) set paginator(paper : MatPaginator){
  //   if(paper) this.dataSource.paginator = paper;
  // };

  // @ViewChild(MatSort) set sort(sorter:MatSort) {
  //   if (sorter) this.dataSource.sort = sorter;
  // }
  //@ViewChild('EmployeePaginator') paginator: MatPaginator;
  filterData(event :any){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewChecked(): void {
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
