import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { EmpInterface } from 'src/app/interfaces/app.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  empForm: FormGroup;
  submitName = 'Add';
  msgString : string = '';
  private sub = new Subject();

  private editData! : EmpInterface;
  @Input()
  data!: EmpInterface;
  @Output() apiSuccess = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private apiSrv: ApiService, private router:Router, @Inject(MAT_DIALOG_DATA) public empDetails: any) {
    this.empForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      mobile: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      salary: ['', [Validators.required, Validators.pattern("^[0-9]{5,}$")]]
    });
   }

  ngOnInit(): void {
    this.editData = this.empDetails.empDetails;
    if(this.editData){
      this.makeEditEntry(this.editData);
    }
  }

  resetEmpForm() {
    this.empForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      salary: ''
    })
  }

  makeEditEntry(data: EmpInterface) {
    this.submitName = "Update";
    this.empForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      salary: data.salary
    })
  }

  onSubmit(){
    
    if( this.submitName === "Add"){
      this.apiSrv.postData(this.empForm.value).pipe(takeUntil(this.sub)).subscribe({
        next: resp=>{
          this.router.navigate(['/app-employee']);
          this.apiSuccess.emit(true);
          this.msgString = 'Success';
        },
        error: error =>{
          this.msgString = 'Error';
        }
      })
    } else if(this.submitName === "Update"){
      this.apiSrv.updateData(this.empForm.value, this.editData.id).pipe(takeUntil(this.sub)).subscribe({
         next: resp=>{
           this.router.navigate(['/app-employee']);
           this.apiSuccess.emit(true);
           this.msgString = 'Success';
         },
         error: error =>{
          this.msgString = 'Error';
         }
      })
    }
  }
}
