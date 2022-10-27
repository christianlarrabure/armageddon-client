import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TelnetService } from '../features/telnet.service';
import Topic from '../models/topic.model';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  public selectedTopic = new Subject<number | undefined>();
  public editedTopic = new Subject<number | undefined>();

  constructor(private telnet: TelnetService) {}

  getTopics(): Observable<Topic[]> {
    this.telnet.send('getTopics');
    console.log('Subscribing to topics.');
    return new Observable((subscriber) => {
      this.telnet.on('topics', (event: Electron.IpcMainEvent, topics: any) => {
        const topicsArray: Topic[] = [];
        for (let i = 0; i < topics.length; i++) {
          topicsArray.push(topics[i].dataValues);
        }
        subscriber.next(topicsArray);
        subscriber.complete();
      });
    });
  }

  private isTopicMatch(topic: Topic, search: string): Boolean {
    if (search.length <= 0) {
      return false;
    }
    if (topic.name.toLowerCase().search(search.toLowerCase()) !== -1) {
      return true;
    }

    if (
      topic.sdesc.length > 0 &&
      topic.sdesc.toLowerCase().search(search.toLowerCase()) !== -1
    ) {
      return true;
    }

    return false;
  }

  searchTopics(search: string): Observable<Topic[]> {
    return new Observable((subscriber) => {
      this.getTopics().subscribe((topics) => {
        let matchedTopics: Topic[] = [];
        for (let i = 0; i < topics.length; i++) {
          const topic = topics[i];
          if (this.isTopicMatch(topic, search)) {
            matchedTopics.push(topic);
          }
        }
        subscriber.next(matchedTopics);
        subscriber.complete();
      });
    });
  }

  getTopic(id: number): Observable<Topic> {
    this.telnet.send('getTopic', id);
    return new Observable((subscriber) => {
      this.telnet.on(
        'selectedTopic',
        (event: Electron.IpcMainEvent, topic: any) => {
          subscriber.next(topic.dataValues);
          subscriber.complete();
        }
      );
    });
  }

  createTopic(topic: Topic) {
    this.telnet.send('createTopic', topic);
  }

  updateTopic(topic: Topic) {
    this.telnet.send('updateTopic', topic);
  }

  deleteTopic(id: number) {
    this.telnet.send('deleteTopic', id);
  }
}
