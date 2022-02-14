import { CharacterClass, CharacterSize, CharacterRace } from "./Enums";

export interface IAbilities {
    strength: number,
    dexterity: number,
    intelligence: number,
    wisdom: number,
    charisma: number,
    constitution: number,
}

export interface ISkills {
    acrobatics?: number,
    animalHandling?: number,
    arcana?: number,
    athletics?: number,
    deception?: number,
    history?: number,
    insight?: number,
    intimidation?: number,
    investigation?: number,
    medicine?: number,
    nature?: number,
    perception?: number,
    performance?: number,
    persuasion?: number,
    religion?: number,
    sleightOfHand?: number,
    stealth?: number,
    survival?: number
}

export interface ICharacter {
    name?: string,
    race: CharacterRace,
    abilities?: IAbilities,
    skills?: ISkills,
    armorClass: number,
    maxHitPoints: number,
    currentHitPoints: number,
    speed: number,
    size: CharacterSize,
    class: CharacterClass,
    level: number,
    experience: number, 
}