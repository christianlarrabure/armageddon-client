import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { TelnetService } from '../features/telnet.service';
import Topic from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private telnet:TelnetService) { }

  createTopic(topic:Topic){
    this.telnet.send('createTopic', topic);
  }

  getTopics():Observable<Topic[]>{
    this.telnet.send('getTopics');
    console.log("Subscribing to topics.");
    return new Observable((subscriber)=>{
      this.telnet.on('topics', (event:Electron.IpcMainEvent, topics:any)=>{
        const topicsArray:Topic[] = [];
        for(let i = 0; i < topics.length; i ++) {
          topicsArray.push(topics[i].dataValues);
        }
        console.log("Sending topics.", topicsArray);
        subscriber.next(topicsArray);
      })
    })
  }

  getTopic(id:number):Observable<Topic>{
    this.telnet.send('getTopic', id);
    return new Observable((subscriber)=>{
      this.telnet.on('selectedTopic', (event:Electron.IpcMainEvent, topic:any)=>{
        subscriber.next(topic.dataValues);
        subscriber.complete();
      })  
    })
  }

  updateTopic(topic:Topic){
    this.telnet.send('updateTopic', topic);
  }

  deleteTopic(id:number){
    this.telnet.send('deleteTopic', id);
  }
}
