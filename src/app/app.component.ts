import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  showCharacters: boolean = false;

  dialogOpen: boolean = false;

  openedTopic: number | undefined = undefined;

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
}
