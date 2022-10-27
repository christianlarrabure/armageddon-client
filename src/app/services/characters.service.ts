import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { TelnetService } from '../features/telnet.service';
import Character from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  constructor(private telnet:TelnetService) { }

  getCharacters():Observable<Character[]> {
    return new Observable((subscriber)=> {
      this.telnet.on('characters', (event:Electron.IpcMainEvent, characters:any)=>{
        console.log(characters);
        const charactersArray:Character[]=[];
        for (let i = 0; i < characters.length; i++) {
          charactersArray.push(characters[i].dataValues);
        }
        subscriber.next(charactersArray);
      })
    })
  }
}
