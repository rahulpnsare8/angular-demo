import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeModalComponent } from './employee-modal.component';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('EmployeeModalComponent', () => {
  let component: EmployeeModalComponent;
  let fixture: ComponentFixture<EmployeeModalComponent>;

  beforeEach(async () => {
    const formBuilderStub = () => ({ group: () => ({}) });

    const apiServiceStub = () =>({
      postData : () => ({
        pipe : () =>({
          subscribe :(() => {})
        })
      }),
      updateData : () => ({
        pipe : () => ({
          subscribe : (() => {})
        })
      })
    })
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatDialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ EmployeeModalComponent ],
      providers: [
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: ApiService, useFactory: apiServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create employee modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should set on submit text a default value',() =>{
    expect(component.submitName).toEqual('Add');
  })

  it('should iniitialize empForm with required fields',()=>{
    component.empForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      salary: new FormControl('')
    });
    expect(component.empForm).toBeNaN();
  })

  it('should set edit data on init',() => {
    component.empDetails ={
      empDetails : {
        firstName: 'Rahul',
        lastName: 'Pansare',
        email: 'rahul.pansare@abc.com',
        mobile: 9875643233,
        salary: 20000
      }
    };

    spyOn(component,'makeEditEntry');
    component.ngOnInit();
    
    expect(component.makeEditEntry).toHaveBeenCalled();
  })

  it('should reset employee form', () => {
    component.empForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      salary: new FormControl('')
    });
    component.resetEmpForm();
    expect(component.empForm.value.firstName).toEqual('');
  })

  it('should add entries in all input fields for edit', () => {
    component.empDetails ={
      empDetails : {
        firstName: 'Rahul',
        lastName: 'Pansare',
        email: 'rahul.pansare@abc.com',
        mobile: 9875643233,
        salary: 20000
      }
    };

    component.makeEditEntry(component.empDetails.empDetails);

    expect(component.empForm.value.firstName).toEqual('Rahul');
  })

  it('should submit the new employee details', () => {
    const apiServiceStub : ApiService = fixture.debugElement.injector.get(ApiService);

    spyOn((component as any).router,'navigate');
    component.submitName = 'Add';

    spyOn(apiServiceStub,'postData').and.returnValue(of({}));
    
    component.onSubmit();

    expect((component as any).router.navigate).toHaveBeenCalled();

  })

  it('should submit the new employee but failed to save', () => {
    const apiServiceStub : ApiService = fixture.debugElement.injector.get(ApiService);

    spyOn((component as any).router,'navigate');
    component.submitName = 'Add';

    spyOn(apiServiceStub,'postData').and.returnValue(throwError('error'));
    
    component.onSubmit();

    expect(component.msgString).toEqual('Error');

  })

  it('should edit the employee details', () => {
    const apiServiceStub : ApiService = fixture.debugElement.injector.get(ApiService);

    spyOn((component as any).router,'navigate');
    (component as any).editData = {id:1};
    component.submitName = 'Update';

    spyOn(apiServiceStub,'updateData').and.returnValue(of({}));
    
    component.onSubmit();

    expect((component as any).router.navigate).toHaveBeenCalled();

  })

  it('should edit the employee but failed to save', () => {
    const apiServiceStub : ApiService = fixture.debugElement.injector.get(ApiService);

    spyOn((component as any).router,'navigate');
    (component as any).editData = {id:1};
    component.submitName = 'Update';

    spyOn(apiServiceStub,'updateData').and.returnValue(throwError('error'));
    
    component.onSubmit();

    expect(component.msgString).toEqual('Error');

  })
});
