import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewEncapsulation,
  NgZone,
} from '@angular/core';
import { TelnetService } from '../telnet.service';
import { NgTerminal } from 'ng-terminal';

@Component({
  selector: 'app-terminal-client',
  templateUrl: './terminal-client.component.html',
  styleUrls: ['./terminal-client.component.css'],
})
export class TerminalClientComponent implements OnInit, AfterViewInit {
  @ViewChild('term', { static: false }) term!: NgTerminal;

  constructor(private telnet: TelnetService, private zone: NgZone) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.term.setXtermOptions({
      theme: {
        background: '#111827',
        cursor: '#111827',
      },
      minimumContrastRatio: 7,
    });
    this.term.onData().subscribe((input) => {
      console.log(input);
    });

    this.term.setDraggable

    this.telnet.on(
      'message',
      (event: Electron.IpcMessageEvent, message: string) => {
        this.zone.run(() => {
          this.term.write(message);
        });
      }
    );

    this.telnet.send('init');
  }
}
