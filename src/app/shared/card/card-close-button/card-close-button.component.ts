import { Component, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-card-close-button',
  templateUrl: './card-close-button.component.html',
  styleUrls: ['./card-close-button.component.css'],
})
export class CardCloseButtonComponent {
  @Output() close = new EventEmitter<boolean>();

  constructor() {}

  doClose() {
    this.close.emit(true);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKeyPress(event: KeyboardEvent) {
    this.close.emit(true);
  }
}
