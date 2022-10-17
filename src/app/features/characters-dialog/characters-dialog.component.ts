import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import Character from 'src/app/models/character.model';
import { CharactersService } from 'src/app/services/characters.service';
import { TelnetService } from '../telnet.service';

@Component({
  selector: 'app-characters-dialog',
  templateUrl: './characters-dialog.component.html',
})
export class CharactersDialogComponent implements OnInit {
  characters!: Character[];
  @Output() doClose = new EventEmitter<any>();

  newCharacter: Character = {
    name: '',
    sdesc: '',
    notes: '',
  };

  constructor(
    private service: CharactersService,
    private telnet: TelnetService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.telnet.send('getTopics');

    this.service.getCharacters().subscribe((characters) => {
      this.zone.run(() => {
        this.characters = characters;
      });
    });
  }

  createCharacter() {
    this.telnet.send('createCharacter', this.newCharacter);
  }

  close() {
    this.doClose.emit();
  }
}
