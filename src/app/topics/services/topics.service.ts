import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  filter,
  combineLatest,
  map,
  merge,
  BehaviorSubject,
} from 'rxjs';
import { TelnetService } from '../../features/telnet.service';
import Topic from '../../models/topic.model';
import { ArmageddonService } from '../../armageddon/armageddon.service';

@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor(
    private telnet: TelnetService,
    private armageddon: ArmageddonService
  ) {}

  public smartSearchActive$ = new BehaviorSubject<boolean>(false);

  public selectedTopic = new BehaviorSubject<number | undefined>(undefined);
  public editedTopic = new BehaviorSubject<number | undefined>(undefined);

  public selectedTopic$ = this.selectedTopic.asObservable().pipe(
    map((topicId) => {
      if (topicId === undefined) {
        return undefined;
      }
      return this.getTopic(topicId);
    })
  );
  public editedTopic$ = this.editedTopic.asObservable().pipe(
    map((topicId) => {
      if (topicId === undefined) {
        return undefined;
      }
      return this.getTopic(topicId);
    })
  );

  private _topics$ = new Subject<Topic[]>();
  public selectedTopics$ = new Subject<Topic[]>();
  public topics$ = this._topics$;

  private _topicsMentioned$ = combineLatest([
    this.topics$,
    this.armageddon.cleanMessages$,
  ]).pipe(
    map((value) => {
      const topics: Topic[] = value[0];
      const msg: string = value[1];
      const mentions: Topic[] = [];
      console.log(msg);
      for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];

        if (topic.sdesc.length <= 0) {
          continue;
        }

        if (msg.toLowerCase().search(topic.sdesc.toLowerCase()) >= 0) {
          mentions.push(topic);
        }
      }
      return mentions;
    }),
    filter((value) => {
      return value.length > 0;
    })
  );

  public topicsMentioned$ = merge(this._topicsMentioned$, this.selectedTopics$);

  refreshTopics() {
    return new Promise((resolve, reject) => {
      this.telnet.send('getTopics');
      console.log('Requested topics.');
      this.telnet.on('topics', (event: Electron.IpcMainEvent, topics: any) => {
        const topicsArray: Topic[] = [];
        for (let i = 0; i < topics.length; i++) {
          topicsArray.push(topics[i].dataValues);
        }
        this._topics$.next(topicsArray);
        console.log('Topics refreshed.', topicsArray);
        resolve(true);
      });
    });
  }

  refreshTopicsLater(delay = 1000) {
    setTimeout(this.refreshTopics, delay);
  }

  getTopics(): Observable<Topic[]> {
    this.refreshTopics();
    return this.topics$;
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
    this.refreshTopicsLater();
  }

  updateTopic(topic: Topic) {
    this.telnet.send('updateTopic', topic);
    this.refreshTopicsLater();
  }

  deleteTopic(id: number) {
    this.telnet.send('deleteTopic', id);
    this.refreshTopicsLater();
  }

  isTopicObject(topic: Topic): boolean {
    if (topic.isA === 'object' || topic.isA === 'food') {
      return true;
    }
    return false;
  }
}
