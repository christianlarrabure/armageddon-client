import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent implements OnInit {

  @Input() label:string="Test";
  @Input() value!:boolean;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  setValue(newValue:boolean) {
    this.valueChange.emit(newValue);
  }

}
