export default interface PlayerCharacter {
    hp: number;
    maxHp: number;
    mana: number;
    maxMana: number;
    stamina: number;
    maxStamina: number;
    stun: number;
    maxStun: number;
    focus: number;
    maxFocus: number;
    longDescriptionStatus: string;
    longDescription: string;
    name: string;
    visibility: string; // vis
    position: string; // standing, sitting, resting
    verbosePosition: string;
    flying: string;
    language: string;
    accent: string;
    mount: string;
    speed: string;
    armed: 'armed'|'unarmed'|'';
    mood: string;
    time: 'before dawn'|'dawn'|'early morning'|'late morning'|'high sun'|'early afternoon'|'late afternoon'|'dusk'|'late at night'|'';
    encumbrance: string;
    day: string;
    scan: string;
    listen: string;
    stance: string;
    drunk: string; // sober
    hunger: 'starving'|'famished'|'very hungry'|'hungry'|'little hungry'|'peckish'|'satisfied'|'full'|'stuffed'|'';
    thirst: 'dehydrated'|'parched'|'very thirsty'|'thirsty'|'little thirsty'|'not thirsty'|'';
    combatQuit: string;
};

export const hungerValues = ['starving', 'famished', 'very hungry', 'hungry', 'little hungry', 'peckish', 'satisfied', 'full', 'stuffed'];
