import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import PlayerCharacter from 'src/app/models/playerCharacter.model';

interface MirageData {
  storedCharacters: { [index: string]: PlayerCharacter };
  character: PlayerCharacter;
}

@Injectable({
  providedIn: 'root'
})
export class MirageService {
  public data: MirageData = {
    storedCharacters: {
      amos,
      malik,
    },
    character: amos,
  }

  public mirage$ = new Subject<void>();
  public mirageData$ = this.mirage$.asObservable().pipe(map(()=>{
    return this.data;
  }));

  constructor() { }
}

const amos: PlayerCharacter = {
  hp: 69,
  maxHp: 69,
  mana: 420,
  maxMana: 420,
  stamina: 42,
  maxStamina: 100,
  stun: 87,
  maxStun: 87,
  focus: 100,
  maxFocus: 100,
  longDescriptionStatus: '',
  longDescription: '',
  name: 'Amos',
  visibility: 'Vis', // vis
  position: 'sitting', // standing, sitting, resting
  verbosePosition: 'sitting on: a majestic golden throne',
  flying: '',
  language: 'sirihish',
  accent: 'southern',
  mount: 'Riding: none',
  speed: 'walking',
  armed: 'unarmed',
  mood: '',
  time: 'high sun',
  encumbrance: 'no problem',
  day: 'Dzeda',
  scan: '',
  listen: '',
  stance: '',
  drunk: 'sober', // sober
  hunger: 'satisfied',
  thirst: 'not thirsty',
  combatQuit: ''
}

const malik: PlayerCharacter = {
  hp: 42,
  maxHp: 69,
  mana: 100,
  maxMana: 100,
  stamina: 117,
  maxStamina: 121,
  stun: 89,
  maxStun: 89,
  focus: 100,
  maxFocus: 100,
  longDescriptionStatus: '',
  longDescription: '',
  name: 'Malik',
  visibility: 'Vis', // vis
  position: 'standing', // standing, sitting, resting
  verbosePosition: 'standing',
  flying: '',
  language: 'sirihish',
  accent: 'northern',
  mount: 'Riding: a ferocious t-rex',
  speed: 'sneakin',
  armed: 'armed',
  mood: '',
  time: 'late at night',
  encumbrance: 'light',
  day: 'Detal',
  scan: 'Scan',
  listen: 'Listen',
  stance: '',
  drunk: 'drunk', // sober
  hunger: 'little hungry',
  thirst: 'not thirsty',
  combatQuit: ''
}
