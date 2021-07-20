import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  @Output() apiSuccess = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  proceedDelete(){
    this.apiSuccess.emit(true);
  }
}
