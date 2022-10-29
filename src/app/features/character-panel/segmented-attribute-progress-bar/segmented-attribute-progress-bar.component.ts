import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-segmented-attribute-progress-bar',
  templateUrl: './segmented-attribute-progress-bar.component.html',
  styleUrls: ['./segmented-attribute-progress-bar.component.css']
})
export class SegmentedAttributeProgressBarComponent implements OnInit {
  @Input() attribute: string = "";
  @Input() valueLabel: string = "";
  @Input() value: number = 0;
  @Input() fullColor: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
