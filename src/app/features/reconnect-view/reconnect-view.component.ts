import { Component, OnInit } from '@angular/core';
import { ArmageddonService } from '../../armageddon/armageddon.service';

@Component({
  selector: 'app-reconnect-view',
  templateUrl: './reconnect-view.component.html',
  styleUrls: ['./reconnect-view.component.css']
})
export class ReconnectViewComponent implements OnInit {

  constructor(private armageddon: ArmageddonService) { }

  ngOnInit(): void {
  }

  handleReconnect(): void {
    console.log('Reconnect Raised in ReconnectViewComponent.');
    this.armageddon.reconnect();
  }
}
