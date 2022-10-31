import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
        this.refreshItemList();
      }
    );

    this.armageddon.characterData$.subscribe((data) => {
      this.zone.run(() => {
        this.character = data;
        this.refreshItemList();
      });
    });
  }

  // Character Card utilities
  itemList = [
    {
      id: "character-card-separator",
      variant: CharacterSummaryItemVariant.SEPARATOR,
      data: ["Hidden - drag above to show"],
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-armed",
      type: "item",
      variant: CharacterSummaryItemVariant.ARMED,
      data: [this.character.armed],
      refreshData: function(character: PlayerCharacter) { this.data = [character.armed] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-time",
      type: "item",
      variant: CharacterSummaryItemVariant.TIME,
      data: [this.character.time, this.character.day],
      refreshData: function (character: PlayerCharacter) { this.data = [character.time, character.day] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-speed",
      type: "item",
      variant: CharacterSummaryItemVariant.SPEED,
      data: [this.character.speed],
      refreshData: function (character: PlayerCharacter) { this.data = [character.speed] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-encumbrance",
      type: "item",
      variant: CharacterSummaryItemVariant.ENCUMBRANCE,
      data: [this.character.encumbrance],
      refreshData: function (character: PlayerCharacter) { this.data = [character.encumbrance] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-position",
      type: "item",
      variant: CharacterSummaryItemVariant.POSITION,
      data: [this.character.position, this.character.verbosePosition],
      refreshData: function (character: PlayerCharacter) { this.data = [character.position, character.verbosePosition] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-language",
      type: "item",
      variant: CharacterSummaryItemVariant.LANGUAGE,
      data: [this.character.accent, this.character.language],
      refreshData: function (character: PlayerCharacter) { this.data = [character.accent, character.language] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-scan",
      type: "item",
      variant: CharacterSummaryItemVariant.SCAN,
      data: [this.character.scan],
      refreshData: function (character: PlayerCharacter) { this.data = [character.scan] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-listen",
      type: "item",
      variant: CharacterSummaryItemVariant.LISTEN,
      data: [this.character.listen],
      refreshData: function (character: PlayerCharacter) { this.data = [character.listen] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
    {
      id: "character-card-flying",
      type: "item",
      variant: CharacterSummaryItemVariant.FLYING,
      data: [this.character.flying],
      refreshData: function(character: PlayerCharacter) { this.data = [character.flying] },
      visibility: [true, true, false],
      setVisibility: function ({ hidden, fadeIn, fadeOut }: { [index: string]: boolean }) {
        this.visibility = [hidden, fadeIn, fadeOut];
      },
    },
  ];

  refreshItemList() {
    for (const item of this.itemList) {
      if (item.refreshData) item.refreshData(this.character);
    }
  }

  assignHiddenToItemList() {
    let pastHidden = false;
    this.itemList.forEach(item => {
      if (item.id === "character-card-separator") {
        pastHidden = true;
      }
      if (pastHidden) {
        const hidden = true;
        const fadeIn = item.visibility[1];
        const fadeOut = item.visibility[2];
        item.setVisibility({ hidden, fadeIn, fadeOut });
      }
    });
  }

  assignFadeInToItemList() {
    let pastHidden = false;
    this.itemList.forEach(item => {
      if (item.id === "character-card-separator") {
        pastHidden = true;
      }
      if (pastHidden) {
        const hidden = item.visibility[0];
        const fadeIn = true;
        const fadeOut = false;
        item.setVisibility({ hidden, fadeIn, fadeOut });
      }
    });
  }

  unassignHiddenFromItemList() {
    let pastHidden = false;
    this.itemList.forEach(item => {
      if (item.id === "character-card-separator") {
        pastHidden = true;
      }
      if (pastHidden) {
        const hidden = false;
        const fadeIn = item.visibility[1];
        const fadeOut = item.visibility[2];
        item.setVisibility({ hidden, fadeIn, fadeOut });
      }
    });
  }

  unassignFadeInFromItemList() {
    let pastHidden = false;
    this.itemList.forEach(item => {
      if (item.id === "character-card-separator") {
        pastHidden = true;
      }
      if (pastHidden) {
        const hidden = item.visibility[0];
        const fadeIn = false;
        const fadeOut = true;
        item.setVisibility({ hidden, fadeIn, fadeOut });
      }
    });
  }

  getDataForVariant(variant: CharacterSummaryItemVariant) {
    switch (variant) {
      case CharacterSummaryItemVariant.ARMED:
        return this.character.armed;
      case CharacterSummaryItemVariant.TIME:
        return this.character.time;
      case CharacterSummaryItemVariant.FLYING:
        return this.character.flying;
      default:
        return '';
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    console.log("itemList before: ", this.itemList);
    moveItemInArray(this.itemList, event.previousIndex, event.currentIndex);
    if (event.currentIndex <= this.getHiddenSeparatorIndex()) {
      console.log("Detected move above hidden sep");
      event.item.element.nativeElement
        .querySelector(".inner")?.classList.remove("toggle-on-unlock");
    } else if (event.currentIndex > this.getHiddenSeparatorIndex()) {
      console.log("Detected move below hidden sep");
      event.item.element.nativeElement
        .querySelector(".inner")?.classList.remove("toggle-on-unlock");
      event.item.element.nativeElement
        .querySelector(".inner")?.classList.add("toggle-on-unlock");
    }
    console.log("itemList after: ", this.itemList);
  }

  getHiddenSeparatorIndex() {
    return this.itemList.findIndex(({ id }) => (id === "character-card-separator"));
  }

  toggleCharacterSummaryCardLocked() {
    toggleClassByClassName('.toggle-on-unlock');

    this.zone.run(() => {
      this.characterSummaryCardLocked = !this.characterSummaryCardLocked;
      if (this.characterSummaryCardLocked) {
        this.assignHiddenToItemList();
        this.unassignFadeInFromItemList();
      } else {
        this.unassignHiddenFromItemList();
        this.assignFadeInToItemList();
      }
      console.log(this.itemList);
    });
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
``
enum CharacterSummaryCardItemState {
  SHOW,
  HIDE
}

function toggleClassByClassName(className: string) {
  let elems = document.querySelectorAll(className) as NodeListOf<HTMLElement>;

  for (let elem of Array.from(elems)) {
    toggleClass(elem);
  }
}

function toggleClass(elem: HTMLElement) {
  if (!elem) return;

  const isCollapsed = elem.getAttribute('data-collapsed') === 'true';
  if(isCollapsed) {
    expandSection(elem);
  } else {
    collapseSection(elem);
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
    element.style.transitionTimingFunction = 'linear';

    // on the next frame (as soon as the previous style change has taken effect),
    // have the element transition to height: 0 and opacity: 0
    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';

      // set the opacity of the summary-item element
      const innerElem = element.querySelector('app-character-summary-item .summary-item');
      console.log(innerElem);
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
    element.style.transitionTimingFunction = 'linear';

    // keep the cursor from flickering during transition
    element.style.cursor = 'default';
  });

  // mark the section as "currently not collapsed"
  element.setAttribute('data-collapsed', 'false');
}

export enum CharacterSummaryItemVariant {
  BLANK,
  SEPARATOR,
  ARMED,
  TIME,
  SPEED,
  FLYING,
  ENCUMBRANCE,
  POSITION,
  LANGUAGE,
  SCAN,
  LISTEN,
}
