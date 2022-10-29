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
import { ArmageddonService } from '../../armageddon/armageddon.service';

@Component({
  selector: 'app-terminal-client',
  templateUrl: './terminal-client.component.html',
  styleUrls: ['./terminal-client.component.css'],
})
export class TerminalClientComponent implements OnInit, AfterViewInit {
  @ViewChild('term', { static: false }) term!: NgTerminal;

  constructor(
    private telnet: TelnetService,
    private armageddon: ArmageddonService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.armageddon.messages.subscribe((message) => {
      this.term.write(message);
    });

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

    this.term.setDraggable;
  }
}
