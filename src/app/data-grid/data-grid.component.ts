import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
export class DataGridComponent  {
  
  constructor() { }

  ngOnInit() {
    this.dataSource.filterPredicate =
        (data: UserDetails, filter: string) => !filter || data.firstName == filter;
  }

  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email', 'mobile', 'salary'];
  dataSource =new MatTableDataSource<UserDetails>(ELEMENT_DATA);

  @ViewChild(MatPaginator) set paginator(paper : MatPaginator){
    if(paper) this.dataSource.paginator = paper;
  };

  @ViewChild(MatSort) set sort(sorter:MatSort) {
    if (sorter) this.dataSource.sort = sorter;
  }
  //@ViewChild('EmployeePaginator') paginator: MatPaginator;
  filterData(event :any){
    this.dataSource.filter = event.target.value;
    console.log(event.target.value);
  }


}
