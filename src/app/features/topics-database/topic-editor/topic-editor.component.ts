import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic-editor',
  templateUrl: './topic-editor.component.html',
  styleUrls: ['./topic-editor.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TopicEditorComponent implements OnInit {
  topic:Topic = {
    id: undefined,
    name: '',
    content: '',
    isCharacter: false,
    sdesc: ''
  };

  loaded:boolean=false;

  @Input() selectedTopic!:undefined|number;
  @Output() done = new EventEmitter<boolean>();

  constructor(private service:TopicsService) { }

  ngOnInit(): void {
    if(this.selectedTopic !== undefined) {
      this.service.getTopic(this.selectedTopic).subscribe(topic=>{
        console.log(topic);
        this.topic = topic;
        this.loaded = true;
      })
    }else{
      this.loaded = true;
    }
  }

  save() {
    if(this.selectedTopic !== undefined) {
      this.topic.id = this.selectedTopic;
      console.log(`Updating topic ${this.topic.id}...`);
      console.log(this.topic);
      this.service.updateTopic(this.topic);
    }else{
      console.log("Creating topic...");
      this.service.createTopic(this.topic);
    }
    console.log(this.topic);
    this.done.emit(true);
  }

  close() {
    this.done.emit(false);
  }
}
