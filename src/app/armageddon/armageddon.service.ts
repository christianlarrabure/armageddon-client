import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Subject, filter, map } from 'rxjs';
import StripAnsi from 'strip-ansi';
import PlayerCharacter from '../models/playerCharacter.model';

@Injectable({
  providedIn: 'root',
})
export class ArmageddonService {
  private _ipc: IpcRenderer = window.require('electron').ipcRenderer;
  public rawMessages: Subject<string> = new Subject();

  /* PROMPT HANDLING */
  public characterData$ = new Subject<PlayerCharacter>();

  /* REGULAR MESSAGE HANDLING */
  private _prePromptMessage = new Subject<string>();
  public messages = this._prePromptMessage.asObservable().pipe(
    map((msg) => {
      const promptRegExp =
        /([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) ([0-9]{1,3})\/([0-9]{1,3}) \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\] \[(.*?)\]/g;
      const result = promptRegExp.exec(msg);
      if (result === null) {
        return msg;
      }

      const character: PlayerCharacter = {
        hp: +result[1],
        maxHp: +result[2],
        mana: +result[3],
        maxMana: +result[4],
        stamina: +result[5],
        maxStamina: +result[6],
        stun: +result[7],
        maxStun: +result[8],
        focus: +result[9],
        maxFocus: +result[10],
        longDescriptionStatus: result[11],
        longDescription: result[12],
        name: result[13],
        visibility: result[14],
        position: result[15],
        verbosePosition: result[16],
        flying: result[17],
        language: result[18],
        accent: result[19],
        mount: result[20],
        speed: result[21],
        armed: '',
        mood: result[23],
        time: '',
        encumberance: result[25],
        day: result[26],
        scan: result[27],
        listen: result[28],
        stance: result[29],
        drunk: result[30],
        hunger: '',
        thirst: '',
        combatQuit: result[33],
      };

      if (result[22] == 'armed' || result[22] == 'unarmed') {
        character.armed = result[22];
      }

      if (
        result[24] == 'before dawn' ||
        result[24] == 'dawn' ||
        result[24] == 'early morning' ||
        result[24] == 'late morning' ||
        result[24] == 'high sun' ||
        result[24] == 'early afternoon' ||
        result[24] == 'late afternoon' ||
        result[24] == 'dusk' ||
        result[24] == 'late at night'
      ) {
        character.time = result[24];
      }

      if (
        result[31] == 'starving' ||
        result[31] == 'famished' ||
        result[31] == 'very hungry' ||
        result[31] == 'hungry' ||
        result[31] == 'little hungry' ||
        result[31] == 'peckish' ||
        result[31] == 'satisfied' ||
        result[31] == 'full' ||
        result[31] == 'stuffed'
      ) {
        character.hunger = result[31];
      }

      if (
        result[32] == 'dehydrated' ||
        result[32] == 'parched' ||
        result[32] == 'very thirsty' ||
        result[32] == 'thirsty' ||
        result[32] == 'little thirsty' ||
        result[32] == 'not thirsty'
      ) {
        character.thirst = result[32];
      }

      this.characterData$.next(character);
      return msg.replace(promptRegExp, '');
    })
  );
  public cleanMessages$ = this.messages.pipe(map((value) => StripAnsi(value)));

  /* LOCATION HANDLING */

  private locationRegExp: RegExp = /(.+) \[(.+)\]/g;

  public locationStrings$ = this.cleanMessages$.pipe(
    filter((value) => {
      const result = this.locationRegExp.exec(value);
      return result !== null;
    })
  );

  public roomNames$ = this.locationStrings$.pipe(
    map((value) => {
      const captureRegExp = /(.+) \[(.+)\]/g;
      const result = captureRegExp.exec(value);
      if (result !== null) {
        return result[1];
      }
      return 'Unknown';
    })
  );

  public roomExits$ = this.locationStrings$.pipe(
    map((value) => {
      const captureRegExp = /(.+) \[(.+)\]/g;
      const result = captureRegExp.exec(value);
      if (result !== null) {
        return result[2].split('');
      }
      return [];
    })
  );

  private cachedMessage: string = '';

  sendCachedMessage() {
    if (this.cachedMessage.length > 0) {
      this.cachedMessage = this.cachedMessage.replace('\n', '\r\n');
      this._prePromptMessage.next(this.cachedMessage);
      this.cachedMessage = '';
    }
  }

  constructor() {
    this.rawMessages.subscribe((message) => {
      this.cachedMessage = this.cachedMessage + message;
      if (this.cachedMessage.search('\n') !== -1) {
        this.sendCachedMessage();
      } else {
        setTimeout(() => {
          this.sendCachedMessage();
        }, 300);
      }
    });
    this._ipc.on('message', (event: any, message: string) => {
      const msgs = message.split('\n');
      for (let i = 0; i < msgs.length; i++) {
        const msg = msgs[i].replace('\r', '');
        let token = '';
        if (i + 1 < msgs.length && msgs.length !== 1) {
          token = '\r\n';
        }
        this.rawMessages.next(`${msg}${token}`);
      }
    });
  }
}
