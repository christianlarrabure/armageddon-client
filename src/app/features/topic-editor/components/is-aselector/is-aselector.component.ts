import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-is-aselector',
  templateUrl: './is-aselector.component.html',
})
export class IsASelectorComponent {
  options = ['concept', 'character', 'object'];
  @Input() type: string = 'concept';
  @Output() typeChanged = new EventEmitter<string>();

  constructor() {}

  selectTopicType(topicType: string) {
    this.typeChanged.emit(topicType);
  }
}
