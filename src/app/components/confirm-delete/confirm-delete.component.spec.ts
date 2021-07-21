import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteComponent } from './confirm-delete.component';

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the employee when user confirms', ()=>{
    let proceedDeleteResp = false;
    component.apiSuccess.subscribe(res=> proceedDeleteResp = res)

    component.proceedDelete();

    expect(proceedDeleteResp).toBe(true);

  })
});
