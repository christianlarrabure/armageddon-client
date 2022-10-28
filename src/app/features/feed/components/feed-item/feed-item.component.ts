import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Topic from '../../../../models/topic.model';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
})
export class FeedItemComponent implements OnInit {
  @Input() topic?: Topic;
  @Output() clear = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  clearItem() {
    this.clear.emit();
  }
}
