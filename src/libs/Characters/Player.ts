import BaseCharacter from "./BaseCharacter";
import raceModifiers from '../../data/raceModifiers.json';
import { CharacterRace } from "../Enums";
import { rollAbilityScore } from "../utils";

export default class Player extends BaseCharacter {

    weight: number = 0;

    constructor(race: CharacterRace, name: string = "Player" ) {
        super();

        this.name = name;
        this.race = race;

        this.abilities = {
            strength: rollAbilityScore() + ( (raceModifiers as any)[this.race].strength || 0),
            dexterity: rollAbilityScore() + ((raceModifiers as any)[this.race].dexterity || 0),
            constitution: rollAbilityScore() + ((raceModifiers as any)[this.race].constitution || 0),
            intelligence: rollAbilityScore() + ((raceModifiers as any)[this.race].intelligence || 0),
            wisdom: rollAbilityScore() + ((raceModifiers as any)[this.race].wisdom || 0),
            charisma: rollAbilityScore() + ((raceModifiers as any)[this.race].charisma || 0)
        }
        
    }
}