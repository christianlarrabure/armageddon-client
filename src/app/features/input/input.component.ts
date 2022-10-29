import { Component, OnInit } from '@angular/core';
import { MirageService } from '../mirage/services/mirage.service';
import { TelnetService } from '../telnet.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  input: string = '';
  history: string[] = [];
  historyPosition:number = 0;

  constructor(private telnet: TelnetService, private mirageService: MirageService) {}

  ngOnInit(): void {}

  submitInput(event: Event) {
    this.history.push(this.input);
    this.historyPosition = this.history.length;
    console.log(this.input);
    if (event.target) {
      (event.target as HTMLInputElement).select();
    }

    if (this.input.startsWith('_mirage')) {
      let arg = this.input.split(' ')[1];

      if (arg in this.mirageService.data.storedCharacters) {
        this.mirageService.data.character = this.mirageService.data.storedCharacters[arg];
        this.mirageService.mirage$.next();
      }

      return;
    }

    // @TODO: Hook this into a Client-side alias system instead of a straight if clause
    if (this.input === '_prompt') {
      this.telnet.send(
        'sendInput',
        // @TODO: Move this to a Constants file or utility
        'prompt %h/%H %m/%M %v/%V %t/%T %x/%X [%l] [%L] [%n] [%i] [%s] [%S] [%f] [%o] [%a] [%k] [%w] [%A] [%O] [%e] [%E] [%d] [%p] [%P] [%c] [%R] [%u] [%U] [%q]'
      )
    }

    this.telnet.send('sendInput', this.input);
  }

  keydownEnter(event: Event) {
    event.preventDefault();
  }

  injectHistory() {
    this.input = this.history[this.historyPosition];
  }

  historyUp() {
    if(this.historyPosition > 0) {
      this.historyPosition = this.historyPosition-1;
    }
    this.injectHistory();
  }

  historyDown() {
    if(this.historyPosition < this.history.length) {
      this.historyPosition = this.historyPosition+1;
    }
    this.injectHistory();
  }
}
