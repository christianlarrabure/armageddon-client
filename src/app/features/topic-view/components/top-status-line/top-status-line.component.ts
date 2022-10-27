import { Component, Input } from '@angular/core';
import Topic from 'src/app/models/topic.model';

@Component({
  selector: 'app-top-status-line',
  templateUrl: './top-status-line.component.html',
})
export class TopStatusLineComponent {
  @Input() topic!: Topic;

  constructor() {}
}
