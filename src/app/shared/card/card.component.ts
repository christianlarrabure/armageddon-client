import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Output() close = new EventEmitter<boolean>();

  constructor() {}

  doClose() {
    this.close.emit(true);
  }
}
