import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Topic from 'src/app/models/topic.model';

@Component({
  selector: 'app-single-topic-view',
  templateUrl: './single-topic-view.component.html',
  styleUrls: ['./single-topic-view.component.css']
})
export class SingleTopicViewComponent implements OnInit {
  @Input() topic!:Topic;
  @Output() editTopic = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  doEditTopic() {
    this.editTopic.emit(this.topic.id);
  }
}
