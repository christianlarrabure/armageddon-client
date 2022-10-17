import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'client';
  showCharacters:boolean = false;

  handleClick(type:string) {
    if(type=="characters") {
      this.showCharacters = true;
    }
  }
}
