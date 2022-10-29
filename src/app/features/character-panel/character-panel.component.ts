import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import PlayerCharacter from 'src/app/models/playerCharacter.model';
import { TelnetService } from '../telnet.service';
import { ArmageddonService } from '../../armageddon/armageddon.service';
import { MirageService } from '../mirage/services/mirage.service';

@Component({
  selector: 'app-character-panel',
  templateUrl: './character-panel.component.html',
  styleUrls: ['./character-panel.component.css'],
})
export class CharacterPanelComponent implements OnInit {
  constructor(
    private telnet: TelnetService,
    private zone: NgZone,
    private armageddon: ArmageddonService,
    private mirageService: MirageService
  ) {}

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

  @Output() dialogOpen = new EventEmitter<boolean>();

  @Output() viewTopic = new EventEmitter<number | undefined>();

  roomName$ = this.armageddon.roomNames$;

  characterData$ = this.armageddon.characterData$;

  ngOnInit(): void {
    this.mirageService.mirageData$.subscribe(
      ({ character: mirageCharacter }) => {
        this.character = mirageCharacter;
      }
    );

    this.armageddon.characterData$.subscribe((data) => {
      this.zone.run(() => {
        this.character = data;
      });
    });
  }

  getSegmentedHungerValue() {
    switch (this.character.hunger) {
      case 'starving':
        return 0;
      case 'famished':
        return 1;
      case 'very hungry':
        return 2;
      case 'hungry':
        return 3;
      case 'little hungry':
        return 4;
      case 'peckish':
        return 4;
      case 'satisfied':
        return 5;
      case 'full':
        return 5;
      case 'stuffed':
        return 5;
      default:
        return 5;
    }
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

  getSegmentedThirstValue() {
    switch (this.character.thirst) {
      case 'dehydrated':
        return 0;
      case 'parched':
        return 1;
      case 'very thirsty':
        return 2;
      case 'thirsty':
        return 3;
      case 'little thirsty':
        return 4;
      case 'not thirsty':
        return 5;
      default:
        return 5;
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

  smartSearchChanged(value: boolean) {
    this.dialogOpen.emit(value);
  }

  topicSelected(id: number | undefined) {
    this.viewTopic.emit(id);
  }
}
