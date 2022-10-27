import { Component, OnInit } from '@angular/core';
import { TelnetService } from '../telnet.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
})
export class InputComponent implements OnInit {
  input: string = '';
  history:string[]=[];
  historyPosition:number=0;

  constructor(private telnet: TelnetService) {}

  ngOnInit(): void {}

  submitInput() {
    this.telnet.send('sendInput', this.input);
    this.history.push(this.input);
    console.log(this.input);
    this.input = '';
    this.historyPosition = this.history.length;
  }

  keydownEnter(event: any) {
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
