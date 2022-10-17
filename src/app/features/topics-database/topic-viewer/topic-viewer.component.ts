import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Topic from 'src/app/models/topic.model';

@Component({
  selector: 'app-topic-viewer',
  templateUrl: './topic-viewer.component.html',
  styleUrls: ['./topic-viewer.component.css']
})
export class TopicViewerComponent implements OnInit {

  @Input() topics!:Topic[];
  @Output() selectedTopic=new EventEmitter<number>();
  @Output() close= new EventEmitter<boolean>();
  searchInput:string="";
  viewingTopic:Topic|undefined=undefined;

  constructor() { }

  ngOnInit(): void {
  }

  openTopic(topicId:number|undefined) {
    this.selectedTopic.emit(topicId);
  }

  matchTopics():Topic[] {
    let matchedTopics:Topic[]=[];

    for(let i = 0; i < this.topics.length; i ++) {
      if(this.topics[i].name.toLowerCase().search(this.searchInput.toLowerCase()) !== -1 && this.searchInput.length > 0)  {
        matchedTopics.push(this.topics[i]);
        continue;
      }
      if(this.topics[i].isCharacter) {
        if(this.topics[i].sdesc.toLowerCase().search(this.searchInput.toLowerCase()) !== -1 && this.searchInput.length > 0) {
          matchedTopics.push(this.topics[i]);
        }
      }
    }

    return matchedTopics;
  }

  viewTopic(topic:Topic) {
    this.viewingTopic=topic;
  }

  editTopic(id:number) {
    this.selectedTopic.emit(id);
  }
}
