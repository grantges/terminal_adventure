/*
 * Character.ts
 *
 * @author: Bert Grantges
 * @repository: https://github.com/grantges/terminal_adventure
 * @description: The object model and management of in game characters.
 *
 * Created on Sun Feb 13 2022
 *
 * The MIT License (MIT)
 * Copyright (c) 2022
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { IAbilities, ICharacter, ISkills } from "../Interfaces";
import { roll, calculateModifier, rollAbilityScore, calculateProficiencyBonus } from "../utils";
import { CharacterClass, CharacterSize, CharacterRace } from "../Enums";
import Weapon from '../Weapon'
import { INSPECT_MAX_BYTES } from "buffer";
import Item from "../Item";

export default class BaseCharacter implements ICharacter {
    
    name: string | undefined;
    abilities: IAbilities | undefined;
    skills: ISkills | undefined;
    armorClass: number = 0;
    maxHitPoints: number = 0;
    currentHitPoints: number = 0;
    speed: number = 0;
    race: CharacterRace | string = CharacterRace.UNKNOWN;
    size: CharacterSize  = CharacterSize.UNKNOWN;
    class: CharacterClass = CharacterClass.UNKNOWN;
    level: number = 1;
    experience: number = 0;
    savingThrows: number = 0;

    //armor: 
    weapon: Weapon | undefined;
    

    get proficiencyBonus(): number {
        return calculateProficiencyBonus(this.level);
    }

    get initiative(): number {
        return roll('1d20+'+ calculateModifier(this.abilities?.dexterity || 10))
    }

    get isDead(): boolean {
        return (this.currentHitPoints <= 0 && this.savingThrows <= 0);
    }

    get isUnconscious(): boolean {
        return (this.currentHitPoints <= 0 && this.savingThrows > 0);
    }

    damage(points: number) {
        
        if(this.currentHitPoints - points >= 0) {
            this.currentHitPoints = this.currentHitPoints - points;
        }
        else {
            this.currentHitPoints = 0;
            if(this.savingThrows != 0){
                this.savingThrows--;
            }
        }

    }

    heal(points: number): void {
        if(this.currentHitPoints + points <= this.maxHitPoints) {
            this.currentHitPoints = this.currentHitPoints + points;
        }
        else {
            this.currentHitPoints = this.maxHitPoints;
        }
    }

    equip(type: string, key: string) {
        
        switch(type){
            case 'weapons':
                this.weapon = new Weapon(type, key);
                break;
            case 'armor':
                break;
            default:
        }
    }

    attack(character: BaseCharacter) : number {

        const attackRoll = roll('1d20');

        if(attackRoll >= character.armorClass) {
            
            const attackDi = this.weapon?.damage || '1d4';
            const damageRoll = roll(attackDi);
            character.damage(damageRoll);

            return damageRoll;
        }

        return 0;
    }

    
}