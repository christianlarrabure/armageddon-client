import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blurred-background',
  templateUrl: './blurred-background.component.html',
  styleUrls: ['./blurred-background.component.css'],
})
export class BlurredBackgroundComponent implements OnInit {
  @Input() show!: boolean;

  constructor() {}

  ngOnInit(): void {}
}
