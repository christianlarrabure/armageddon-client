import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feed-view',
  templateUrl: './feed-view.component.html',
  styleUrls: ['./feed-view.style.css'],
})
export class FeedViewComponent implements OnInit {
  @Input() active: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
