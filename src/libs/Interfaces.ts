/*
 * Interfaces.ts
 *
 * @author: Bert Grantges
 * @repository: https://github.com/grantges/terminal_adventure
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