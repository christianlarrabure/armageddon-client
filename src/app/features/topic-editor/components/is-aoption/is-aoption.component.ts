import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-is-aoption',
  templateUrl: './is-aoption.component.html',
})
export class IsAOptionComponent {
  @Input() selected: boolean = false;
  @Input() label: string = '';
  @Output() selectedTopic = new EventEmitter<
    'character' | 'object' | 'concept'
  >();
  constructor() {}

  select() {
    if (
      this.label == 'character' ||
      this.label == 'object' ||
      this.label == 'concept'
    ) {
      console.log('selected ', this.label);
      this.selectedTopic.emit(this.label);
    }
  }

  titleCase() {
    return this.label[0].toUpperCase() + this.label.slice(1).toLowerCase();
  }
}
