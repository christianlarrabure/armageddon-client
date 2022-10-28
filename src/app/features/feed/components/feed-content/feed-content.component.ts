import { Component, OnInit, Input } from '@angular/core';
import Topic from '../../../../models/topic.model';

@Component({
  selector: 'app-feed-content',
  templateUrl: './feed-content.component.html',
})
export class FeedContentComponent implements OnInit {
  @Input() topic?: Topic;
  showMore: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
