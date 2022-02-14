/*
 * Player.ts
 *
 * @author: Bert Grantges
 * @repository: https://github.com/grantges/terminal_adventure
 * @description: An object for the end users character.
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