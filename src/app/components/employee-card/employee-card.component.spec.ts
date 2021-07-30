import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService} from '../../services/api.service';
import { EmployeeCardComponent } from './employee-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { EventEmitter } from '@angular/core';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { of } from 'rxjs';

describe('EmployeeCardComponent', () => {
  let component: EmployeeCardComponent;
  let fixture: ComponentFixture<EmployeeCardComponent>;

  beforeEach(async () => {
    const apiServiceStub = () =>({
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
      declarations: [ EmployeeCardComponent ],
      imports:[MatDialogModule],
      providers:[
        {provide : ApiService, useFactory: apiServiceStub },
        {provide : MatDialog, useFactory: matDialogStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create card component', () => {
    expect(component).toBeTruthy();
  });

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
    expect(component.msgString).toEqual('Success');
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
    expect(component.msgString).toEqual('Success');
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
