import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModalComponent } from './base-modal.component';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('BaseModalComponent', () => {
  let component: BaseModalComponent;
  let fixture: ComponentFixture<BaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ BaseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create base component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize on init', () => {
    spyOn((component as any).componentFactoryResolver,'resolveComponentFactory').and.returnValue({});
    spyOn((component as any).viewContainerRef,'clear');

    const res = {
      instance: {
        data: {},
        apiSuccess: new EventEmitter()
      }
    };
    spyOn((component as any).viewContainerRef, 'createComponent').and.returnValue(res);
    component.ngOnInit();
    expect((component as any).viewContainerRef.clear).toHaveBeenCalled();
  })
});
