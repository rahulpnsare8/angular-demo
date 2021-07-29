import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, EventEmitter, Input, Output, NO_ERRORS_SCHEMA} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';
import { FormBuilder } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const apiServiceStub = () =>({
      getEmpData : () => ({
        pipe : () =>({
          subscribe :(() => {})
        })
      })
    });
    const matDialogStub = () => ({
      open : (BaseModalComponent: any, object: any) =>({})
    });

   @Component({
      selector: 'app-employee-card',
      template: '<div></div>',
    })
    class MockEmployeeCardComponent {
      @Input() public data!: EmpInterface;
      @Output() successEvent = new EventEmitter<any>();
    }


    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, MockEmployeeCardComponent ],
      imports:[MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[
        {provide : ApiService, useFactory: apiServiceStub },
        {provide : MatDialog, useFactory: matDialogStub }
      ]
    })
    .compileComponents();
    spyOn(HomeComponent.prototype,'getEmpData');
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create home component', () => {
    expect(component).toBeTruthy();
  })

  it('should make init call', () => {
    expect(HomeComponent.prototype.getEmpData).toHaveBeenCalled();
  })

  it('should get all emp data on load',() => {
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

  });
