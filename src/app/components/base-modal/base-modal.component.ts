import { Component, OnInit, ComponentFactoryResolver, EventEmitter, Inject, Input, Output, ViewChild, ViewContainerRef, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DailogInterface } from 'src/app/interfaces/app.model';

@Component({
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.css']
})
export class BaseModalComponent implements OnInit, OnDestroy{

  @Input() component : any;
  @Input() rout!: string;
  @Output() apiSuccess = new EventEmitter<any>(); 

  @ViewChild('container', {read : ViewContainerRef}) container! : ViewContainerRef;

  private sub = new Subject();

  constructor(private viewContainerRef : ViewContainerRef, 
    private componentFactoryResolver : ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public empDetails : DailogInterface) { }

  ngOnDestroy() : void{
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();
    
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    (componentRef.instance as any).data = this.empDetails;
    (componentRef.instance as any).rout = this.rout;
    (componentRef.instance as any).apiSuccess.pipe(takeUntil(this.sub)).subscribe((res : boolean) =>{
      if(res){
        this.apiSuccess.emit(true);
      }
    })

  }



}
