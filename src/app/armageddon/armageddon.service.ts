import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable, Subject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArmageddonService {
  private _ipc: IpcRenderer = window.require('electron').ipcRenderer;
  public messages: Subject<string> = new Subject();
  public rawMessages: Subject<string> = new Subject();
  private messages$ = this.rawMessages.asObservable().pipe();
  private cachedMessage: string = '';

  sendCachedMessage() {
    if (this.cachedMessage.length > 0) {
      this.cachedMessage = this.cachedMessage.replace('\n', '\r\n');
      this.messages.next(this.cachedMessage);
      this.cachedMessage = '';
    }
  }

  constructor() {
    this.rawMessages.subscribe((message) => {
      this.cachedMessage = this.cachedMessage + message;
      if (this.cachedMessage.search('\n') !== -1) {
        this.sendCachedMessage();
      } else {
        setTimeout(() => {
          this.sendCachedMessage();
        }, 500);
      }
    });
    this._ipc.on('message', (event: any, message: string) => {
      const msgs = message.split('\n');
      for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i].replace('\r', '');
        let token = '';
        if (i < msgs.length) {
          token = '\r\n';
        }
        this.rawMessages.next(`${msg}${token}`);
      }
    });
  }
}
