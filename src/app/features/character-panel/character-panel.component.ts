import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import PlayerCharacter, {
  hungerValues,
} from 'src/app/models/playerCharacter.model';
import { TelnetService } from '../telnet.service';

@Component({
  selector: 'app-character-panel',
  templateUrl: './character-panel.component.html',
  styleUrls: ['./character-panel.component.css'],
})
export class CharacterPanelComponent implements OnInit {
  character: PlayerCharacter = {
    hp: 0,
    maxHp: 0,
    mana: 0,
    maxMana: 0,
    stamina: 0,
    maxStamina: 0,
    stun: 0,
    maxStun: 0,
    focus: 0,
    maxFocus: 0,
    longDescriptionStatus: '',
    longDescription: '',
    name: '',
    visibility: '',
    position: '',
    verbosePosition: '',
    flying: '',
    language: '',
    accent: '',
    mount: '',
    speed: '',
    armed: '',
    mood: '',
    time: '',
    encumberance: '',
    day: '',
    scan: '',
    listen: '',
    stance: '',
    drunk: '',
    hunger: '',
    thirst: '',
    combatQuit: '',
  };

  @Output() clickOn = new EventEmitter<string>();

  constructor(private telnet: TelnetService, private zone: NgZone) {}

  ngOnInit(): void {
    this.telnet.on(
      'prompt',
      (event: Electron.IpcMessageEvent, loadedCharacter: PlayerCharacter) => {
        this.zone.run(() => {
          this.character = loadedCharacter;
        });
      }
    );
  }

  getHungerValue() {
    switch (this.character.hunger) {
      case 'starving':
        return 1;
      case 'famished':
        return 2;
      case 'very hungry':
        return 3;
      case 'hungry':
        return 4;
      case 'little hungry':
        return 5;
      case 'peckish':
        return 6;
      case 'satisfied':
        return 7;
      case 'full':
        return 8;
      case 'stuffed':
        return 9;
      default:
        return 9;
    }
  }

  getThirstValue() {
    switch (this.character.thirst) {
      case 'dehydrated':
        return 1;
      case 'parched':
        return 2;
      case 'very thirsty':
        return 3;
      case 'thirsty':
        return 4;
      case 'little thirsty':
        return 5;
      case 'not thirsty':
        return 6;
      default:
        return 6;
    }
  }

  getHungerMaxValue() {
    return 9;
  }

  getThirstMaxValue() {
    return 6;
  }
  
  openCharacters() {
    this.clickOn.emit('characters');
  }
}
