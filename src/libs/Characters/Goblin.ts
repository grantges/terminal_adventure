import { CharacterSize } from "../Enums";
import BaseCharacter from "./BaseCharacter";



export default class Goblin extends BaseCharacter {


    constructor() {
        super();

        // Racial Modifiers for Goblin
        this.abilities = {
            strength: 8,
            dexterity: 14,
            constitution: 10,
            intelligence: 10,
            wisdom: 8,
            charisma: 8
        }
        
        this.size = CharacterSize.SMALL
        
    }

}