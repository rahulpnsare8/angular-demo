import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

interface Customer{
  firstName:string,
  lastName:string,
  email:string,
  gender:string,
  address:string,
  address2:string,
  city:string,
  state:string,
  pincode:number,
  languages:any
  date:Date
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  //custForm: FormGroup;
  toppings: FormGroup;

  firstNameControl = new FormControl('', [
    Validators.required,
    // Validators.name,
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
    // Validators.name,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  gender = new FormControl('', [
    Validators.required,
  ]);
  
  address = new FormControl('', [
    Validators.required,
  ]);
  
  address2 = new FormControl('', [
    Validators.required,
  ]);

  city = new FormControl('', [
    Validators.required,
  ]);
  
  state = new FormControl('', [
    Validators.required,
  ]);
  
  postalCode = new FormControl('', [
    Validators.required,
  ]);

  date = new FormControl(new Date("07/29/2021"), [
    Validators.required,
  ]);

  disableSelect = new FormControl(false);

  matcher = new ErrorStateMatcher();

  // languages= [
  //   {name: 'Marathi', completed: true, color: 'primary'},
  //   {name: 'Hindi', completed: false, color: 'accent'},
  //   {name: 'English', completed: false, color: 'warn'}
  // ]
  languages =['Marathi', 'Hindi', 'English'];

  states = ['Maharashtra', 'Gujrat', 'Rajasthan'];

  customerWithData: Customer ={
    address: "Utsav Homes",
    address2: "Bhosari",
    city: "Pune",
    date: new Date(),
    email: "rahul.pansare@xyz.com",
    firstName: "Rahul",
    gender: "1",
    languages: {Marathi: true, Hindi: true, English: true},
    lastName: "Pansare",
    pincode: Number("411039"),
    state: "Maharashtra"
  }

  constructor(private fb:FormBuilder) {
    // this.custForm = this.fb.group({
    //   firstNameControl:new FormControl('',[Validators.required]),
    //   lastNameControl:new FormControl('',[Validators.required]),
    //   emailFormControl:new FormControl('',[Validators.required]),
    //   gender:new FormControl('',[Validators.required]),
    //   address:new FormControl('',[Validators.required]),
    //   address2:new FormControl('',[Validators.required]),
    //   city:new FormControl('',[Validators.required]),
    //   state:new FormControl('',[Validators.required]),
    //   postalCode:new FormControl('',[Validators.required])
    // });
    
    this.toppings = this.fb.group({
      'Marathi':false,
      'Hindi':false,
      'English':false
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
   console.log(this.getCustomer());
  }

  updateAllComplete(){
    console.log(this.toppings.value);
  }

  getCustomer(){
    let customer:Customer ={
      firstName:  this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      email: this.emailFormControl.value,
      gender: this.gender.value,
      address: this.address.value,
      address2: this.address2.value,
      city:this.city.value,
      state:this.state.value,
      pincode:this.postalCode.value,
      languages:this.toppings.value,
      date: this.date.value
    }

    //let pipe = new DatePipe('en-US');
    //customer.date = pipe.transform(customer.date,'dd/MM/yyyy');
    return customer;
  }

  setCustomer(customer : Customer){
    this.firstNameControl.setValue(customer.firstName),
    this.lastNameControl.setValue(customer.lastName),
    this.emailFormControl.setValue(customer.email),
    this.gender.setValue(customer.gender),
    this.address.setValue(customer.address),
    this.address2.setValue(customer.address2),
    this.city.setValue(customer.city),
    this.state.setValue(customer.state),
    this.postalCode.setValue(customer.pincode),
    this.toppings.setValue(customer.languages),
    this.date.setValue(customer.date)
  }

  reset(){
    this.firstNameControl.reset()
    this.lastNameControl.reset(),
    this.emailFormControl.reset(),
    this.gender.reset(),
    this.address.reset(),
    this.address2.reset(),
    this.city.reset(),
    this.state.reset(),
    this.postalCode.reset(),
    this.toppings.reset(),
    this.date.reset()
  }

  setCustomerInpputs(){
    this.setCustomer(this.customerWithData);
  }
 

}
