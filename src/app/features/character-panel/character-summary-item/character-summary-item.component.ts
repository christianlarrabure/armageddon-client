import { Component, Input, OnInit } from '@angular/core';
import { CharacterSummaryItemVariant } from '../character-panel.component';

@Component({
  selector: 'app-character-summary-item',
  templateUrl: './character-summary-item.component.html',
  styleUrls: ['./character-summary-item.component.css']
})
export class CharacterSummaryItemComponent implements OnInit {
  @Input() variant: CharacterSummaryItemVariant = CharacterSummaryItemVariant.BLANK;
  @Input() data: string[] = [];
  // @TODO: Maybe witch this to key-value pairs
  @Input() visibility: boolean[] = [true, true, false];
  @Input() unlocked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  isSeparator() {
    return this.variant === CharacterSummaryItemVariant.SEPARATOR;
  }

  isArmed() {
    return this.variant === CharacterSummaryItemVariant.ARMED;
  }

  isTime() {
    return this.variant === CharacterSummaryItemVariant.TIME;
  }

  isSpeed() {
    return this.variant === CharacterSummaryItemVariant.SPEED;
  }

  isMounted() {
    return this.variant === CharacterSummaryItemVariant.MOUNTED;
  }

  isFlying() {
    return this.variant === CharacterSummaryItemVariant.FLYING;
  }

  isEncumbrance() {
    return this.variant === CharacterSummaryItemVariant.ENCUMBRANCE;
  }

  isPosition() {
    return this.variant === CharacterSummaryItemVariant.POSITION;
  }

  isLanguage() {
    return this.variant === CharacterSummaryItemVariant.LANGUAGE;
  }

  isScan() {
    return this.variant === CharacterSummaryItemVariant.SCAN;
  }

  isListen() {
    return this.variant === CharacterSummaryItemVariant.LISTEN;
  }

  isDrunk() {
    return this.variant === CharacterSummaryItemVariant.DRUNK;
  }

  isMood() {
    return this.variant === CharacterSummaryItemVariant.MOOD;
  }

  isStance() {
    return this.variant === CharacterSummaryItemVariant.STANCE;
  }

  isCombatQuit() {
    return this.variant === CharacterSummaryItemVariant.QUIT;
  }

  isVisibility() {
    return this.variant === CharacterSummaryItemVariant.VISIBILITY;
  }
}
