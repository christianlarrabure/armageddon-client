import { Component, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { ArmageddonService } from './armageddon/armageddon.service';
import { EConnectionStatus } from './armageddon/interfaces/connectionStatus.interface';
import { TelnetService } from './features/telnet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private ngZone: NgZone,
    private armageddon: ArmageddonService,
    private telnet: TelnetService
  ) {}

  ngOnInit(): void {
    this.armageddon.armageddonConnection$.subscribe((connectionStatus) => {
      this.ngZone.run(() => {
        switch (connectionStatus) {
          case EConnectionStatus.RECONNECTING:
            break;
          case EConnectionStatus.CONNECTED:
            this.appView = AppView.APP;
            break;
          case EConnectionStatus.DISCONNECTED:
            this.appView = AppView.RECONNECT;
            break;
          default:
            console.debug(
              'AppComponent received unrecognized ConnectionStatus: ' +
                connectionStatus
            );
            break;
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.telnet.send('init');
  }

  title = 'Unofficial Armageddon Client';
  showCharacters: boolean = false;
  appView: AppView = AppView.APP;

  dialogOpen: boolean = false;

  openedTopic: number | undefined;

  handleClick(type: string) {
    if (type == 'characters') {
      this.showCharacters = true;
    }
  }

  processDialogStatus(value: boolean) {
    this.dialogOpen = value;
  }

  openTopic(id: any) {
    console.log('TOPIC TO OPEN: ', id);
  }

  // Helper methods for fetching AppView state
  showReconnectView(): boolean {
    return this.appView === AppView.RECONNECT;
  }

  showAppView(): boolean {
    return this.appView === AppView.APP;
  }
}

enum AppView {
  APP,
  RECONNECT,
}
