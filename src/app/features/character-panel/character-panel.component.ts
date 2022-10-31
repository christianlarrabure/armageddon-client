import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import PlayerCharacter from 'src/app/models/playerCharacter.model';
import { ArmageddonService } from '../../armageddon/armageddon.service';
import { MirageService } from '../mirage/services/mirage.service';

@Component({
  selector: 'app-character-panel',
  templateUrl: './character-panel.component.html',
  styleUrls: ['./character-panel.component.css'],
})
export class CharacterPanelComponent implements OnInit {
  constructor(
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
    encumbrance: '',
    day: '',
    scan: '',
    listen: '',
    stance: '',
    drunk: '',
    hunger: '',
    thirst: '',
    combatQuit: '',
  };

  characterSummaryCardLocked = true;

  characterSummaryCardConfig: CharacterSummaryCardConfig = {
    armed: CharacterSummaryCardItemState.SHOW,
    time: CharacterSummaryCardItemState.SHOW,
    speed: CharacterSummaryCardItemState.SHOW,
    flying: CharacterSummaryCardItemState.HIDE,
    encumbrance: CharacterSummaryCardItemState.SHOW,
    position: CharacterSummaryCardItemState.SHOW,
    language: CharacterSummaryCardItemState.SHOW,
    listen: CharacterSummaryCardItemState.SHOW,
    scan: CharacterSummaryCardItemState.SHOW,
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

  // Character Card utilities
  toggleCharacterSummaryCardLocked() {
    toggleClass('.toggle-on-unlock');

    let keys = Object.keys(this.characterSummaryCardConfig) as Array<keyof CharacterSummaryCardConfig>;
    for (const key of keys) {
      if (!this.shouldShowCharacterSummaryCardItem(key)) {
        toggleClass(`.toggle-on-unlock-disabled-${key}`);
      }
    }

    this.characterSummaryCardLocked = !this.characterSummaryCardLocked;
  }

  shouldShowCharacterSummaryCardItem(key: keyof CharacterSummaryCardConfig) {
    return this.characterSummaryCardConfig[key] === CharacterSummaryCardItemState.SHOW;
  }

  toggleCharacterSummaryCardItemState(key: keyof CharacterSummaryCardConfig) {
    if (this.characterSummaryCardLocked) return;

    if (this.characterSummaryCardConfig[key] === CharacterSummaryCardItemState.SHOW) {
      this.characterSummaryCardConfig[key] = CharacterSummaryCardItemState.HIDE;
      toggleClass(`.toggle-on-unlock-enabled-${key}`);
      toggleClass(`.toggle-on-unlock-disabled-${key}`);
    } else {
      this.characterSummaryCardConfig[key] = CharacterSummaryCardItemState.SHOW;
      toggleClass(`.toggle-on-unlock-enabled-${key}`);
      toggleClass(`.toggle-on-unlock-disabled-${key}`);
    }
  }

  // Character attribute utilities
  getHungerValue() {
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

  getThirstValue() {
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
}

interface CharacterSummaryCardConfig {
  armed: CharacterSummaryCardItemState;
  time: CharacterSummaryCardItemState;
  speed: CharacterSummaryCardItemState;
  flying: CharacterSummaryCardItemState;
  encumbrance: CharacterSummaryCardItemState;
  position: CharacterSummaryCardItemState;
  language: CharacterSummaryCardItemState;
  listen: CharacterSummaryCardItemState;
  scan: CharacterSummaryCardItemState;
}

enum CharacterSummaryCardItemState {
  SHOW,
  HIDE
}

function toggleClass(className: string) {
  const section = document.querySelector(className);
  const isCollapsed = section?.getAttribute('data-collapsed') === 'true';

  if(isCollapsed) {
    expandSection(section);
  } else {
    collapseSection(section);
  }
}

function collapseSection(element: any) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight;

  // temporarily disable all css transitions
  const elementTransition = element.style.transition;
  element.style.transition = '';

  // keep the cursor from flickering during transition
  const card = document.querySelector('#character-card') as HTMLElement;
  card.style.cursor = 'pointer';

  // on the next frame (as soon as the previous style change has taken effect),
  // explicitly set the element's height to its current pixel height, so we
  // aren't transitioning out of 'auto'
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;
    element.style.transitionTimingFunction = 'ease-in';

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0
    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';
    });
  });

  // mark the section as "currently collapsed"
  element.setAttribute('data-collapsed', 'true');

  // restore the cursor to default
  card.style.cursor = 'default';
}

function expandSection(element: any) {
  // get the height of the element's inner content, regardless of its actual size
  const sectionHeight = element.scrollHeight;

  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + 'px';

  // keep the cursor from flickering during transition
  element.style.cursor = 'pointer';

  // when the next css transition finishes (which should be the one we just triggered)
  element.addEventListener('transitionend', function(e: any) {
    // remove this event listener so it only gets triggered once
    element.removeEventListener('transitionend', arguments.callee);

    // remove "height" from the element's inline styles, so it can return to its initial value
    element.style.height = null;
    element.style.transitionTimingFunction = 'ease-out';

    // keep the cursor from flickering during transition
    element.style.cursor = 'default';
  });

  // mark the section as "currently not collapsed"
  element.setAttribute('data-collapsed', 'false');
}
