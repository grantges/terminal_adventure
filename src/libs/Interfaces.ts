import { CharacterClass, CharacterSize, CharacterRace } from "./Enums";

export interface ICharacter {
    name?: string,
    race: CharacterRace,
    strength: number,
    dexterity: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    constitution: number,
    armorClass: number,
    maxHitPoints: number,
    currentHitPoints: number,
    speed: number,
    size: CharacterSize,
    class: CharacterClass,
    level: number,
    experience: number, 
}