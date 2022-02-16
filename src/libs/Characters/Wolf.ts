/*
 * Wolf.ts
 *
 * @author: Bert Grantges
 * @repository: https://github.com/grantges/terminal_adventure
 * @description: Wolf MOB object.
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

import { CharacterSize } from "../Enums";
import BaseCharacter from "./BaseCharacter";

export default class Wolf extends BaseCharacter {


    constructor() {
        super();

        this.race = 'Wolf';

        // Racial Modifiers for Goblin
        this.abilities = {
            strength: 12,
            dexterity: 15,
            constitution: 12,
            intelligence: 3,
            wisdom: 12,
            charisma: 6
        }

        this.skills = {
            perception: 3,
            stealth: 4,
        }
        
        this.size = CharacterSize.SMALL
        
    }

}