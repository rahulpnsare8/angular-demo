import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  EventEmitter } from '@angular/core';
import { DataGridComponent } from './data-grid.component';

import { ApiService} from '../../services/api.service';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;
  let matDailog : MatDialog;

  beforeEach(async () => {
    const apiServiceStub = () =>({
      getEmpData : () => ({
        pipe : () =>({
          subscribe :(() => {})
        })
      }),
      deleteData : () => ({
        pipe : () => ({
          subscribe : (() => {})
        })
      })
    })
    const matDialogStub = () => ({
      open : (BaseModalComponent: any, object: any) =>({})
    })
    await TestBed.configureTestingModule({
      declarations: [ DataGridComponent ],
      imports:[MatDialogModule],
      providers:[
        {provide : ApiService, useFactory: apiServiceStub },
        {provide : MatDialog, useFactory: matDialogStub },
        MatTableDataSource,
        MatPaginator,
        MatSort
      ]
    })
    .compileComponents();
    spyOn(DataGridComponent.prototype,'getEmpData');
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    //matDailog = TestBed.get(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displayedColumns has values',() =>{
    expect(component.displayedColumns).toEqual(['userId', 'firstName', 'lastName', 'email', 'mobile', 'salary', 'action'])
  })

  it('should make init call', () => {
    expect(DataGridComponent.prototype.getEmpData).toHaveBeenCalled();
  })
 
  it('should get all emp data on load',()=>{
    const apiServiceStub : ApiService = fixture.debugElement.injector.get(ApiService);
    const result = [{ id: 1,
      firstName: 'Rohit',
      lastName: 'Sharma',
      email: 'rohit.sharma@mail.com',
      mobile: 9867543223,
      salary: 45000}];

      spyOn(apiServiceStub,'getEmpData').and.returnValue(of(result));
      (<jasmine.Spy>component.getEmpData).and.callThrough();

      component.getEmpData();
      
      expect(apiServiceStub.getEmpData).toHaveBeenCalled();
  })

  it('Should open emp form dialog', ()=>{
    const empInterfaceStub : EmpInterface = <any>{};
    const resp = {
      componentInstance : {
        apiSuccess : new EventEmitter()
      }
    };
    let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = resp.componentInstance;

    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.openDialog(empInterfaceStub);
    resp.componentInstance.apiSuccess.emit(true);
    expect(component.getEmpData).toHaveBeenCalled();
  })

  it('should open the dialog to add new employee',()=>{
    spyOn(component,'openDialog');
    component.add();
    expect(component.openDialog).toHaveBeenCalled();
  })

  it('should open the dialog to edit emplyee details',()=>{
    const empInterfaceStub : EmpInterface =<any>{};
    spyOn(component,'openDialog').and.callFake(() => {return {componentInstance : EmployeeModalComponent}});
    component.edit(empInterfaceStub);
    expect(component.openDialog).toHaveBeenCalled();

  })

  it('should delete employee when user confirms', () => {
    const apiServiceStub : ApiService = fixture.debugElement.injector.get(ApiService);
    spyOn(apiServiceStub,'deleteData').and.returnValue(of({}));
    component.delete(1);
    expect(component.getEmpData).toHaveBeenCalled();
  })

  it('should confirm before deleting the employee record',() => {
    spyOn(component,'delete');
    const resp = {
      componentInstance : {
        apiSuccess : new EventEmitter()
      }
    };

    let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of({}), close: null });
    dialogRefSpyObj.componentInstance = resp.componentInstance;

    spyOn(TestBed.get(MatDialog), 'open').and.returnValue(dialogRefSpyObj);

    component.confirmDelete(1);

    resp.componentInstance.apiSuccess.emit(true);
    expect(component.delete).toHaveBeenCalled();
  })

});
