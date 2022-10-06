import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root',
})
export class TelnetService {
  private _ipc: IpcRenderer | undefined;

  constructor() {
    this._ipc = window.require('electron').ipcRenderer;
  }

  public on(channel: string, listener: any): void {
    if (!this._ipc) {
      return;
    }

    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args: any[]): void {
    if (!this._ipc) {
      return;
    }

    this._ipc.send(channel, ...args);
  }
}
