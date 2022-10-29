import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attribute-progress-bar',
  templateUrl: './attribute-progress-bar.component.html',
  styleUrls: ['./attribute-progress-bar.component.css']
})
export class AttributeProgressBarComponent implements OnInit {
  @Input() attribute:string="";
  @Input() value:number=0;
  @Input() maxValue:number=0;
  @Input() color:
    'red' |
    'violet' |
    'cyan' |
    'blue' |
    'gray' |
    'green' |
    'emerald' |
    'hunger' | 'thirst' = "red";
  @Input() valueLabel:string="";

  constructor() { }

  ngOnInit(): void {
  }

  getWidthString() {
    return `${(this.value/this.maxValue)*100}%`;
  }

}
