import { Injectable } from '@angular/core';
import { Subject, map, Observable } from 'rxjs';
import TopicPrice from '../../models/topicPrice.model';
import { TelnetService } from '../../features/telnet.service';

@Injectable({
  providedIn: 'root',
})
export class TopicPricesService {
  private _topicPrices$ = new Subject<TopicPrice[]>();
  public topicPrices$ = this._topicPrices$.asObservable();

  constructor(private telnet: TelnetService) {}

  public refreshTopicPrices() {
    if (this.telnet === undefined) {
      console.error(
        'Telnet is undefined at Topic Prices service.',
        this.telnet
      );
      return;
    }
    return new Promise((resolve, reject) => {
      try {
        this.telnet.send('getTopicPrices');
        console.log('Requested topic prices.');
        this.telnet.on(
          'topicPrices',
          (event: Electron.IpcMainEvent, topicPrices: any) => {
            const topicsArray: TopicPrice[] = [];
            for (let i = 0; i < topicPrices.length; i++) {
              topicsArray.push(topicPrices[i].dataValues);
            }
            this._topicPrices$.next(topicsArray);
            console.log('Topic prices refreshed.', topicsArray);
            resolve(true);
          }
        );
      } catch (error) {
        console.error(error);
      }
    });
  }

  refreshTopicPricesLater(delay = 1000) {
    setTimeout(this.refreshTopicPrices, delay);
  }

  getTopicPricesByTopicId(topicId: number): Observable<TopicPrice[]> {
    this.refreshTopicPrices();
    return this.topicPrices$.pipe(
      map((topicPrices: TopicPrice[]) => {
        const filteredTopicPrices: TopicPrice[] = [];
        for (let i = 0; i < topicPrices.length; i++) {
          const topicPrice = topicPrices[i];
          if (topicPrice.topicId !== topicId) {
            continue;
          }
          filteredTopicPrices.push(topicPrice);
        }
        return filteredTopicPrices;
      })
    );
  }

  createTopicPrice(topicPrice: TopicPrice) {
    this.telnet.send('createTopicPrice', topicPrice);
    this.refreshTopicPricesLater();
  }

  updateTopicPrice(topicPrice: TopicPrice) {
    this.telnet.send('updateTopicPrice', topicPrice);
    this.refreshTopicPricesLater();
  }

  deleteTopicPrice(id: number) {
    console.log('Deleting topic price.');
    this.telnet.send('deleteTopicPrice', id);
    this.refreshTopicPricesLater();
  }
}
