/*
 * Parser.ts
 *
 * @author: Bert Grantges
 * @description: The main parsing engine for the game.
 *
 * Created on Sat Feb 12 2022
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


import nlp from 'compromise';

// NLP Grammar files
import mobs from './mobs.json';
import tags from './tags.json';
import places from './places.json';
import items from '../data/items.json';
import commands from './commands.json';
import characters from './characters.json';

type ParserResponse = {
    direction?: string,
    action?: string,
    noun?: string,
    verb?: string,
    character?: string,
    mob?: string,
    item?: string,
    weapon?: string,
}

export default class Parser {

    constructor(){
        this.setup()
    }

    setup() {
        nlp.extend((Doc:any, world:any) => {
            world.addTags(tags);
            world.addWords(mobs);
            world.addWords(places);
            world.addWords(commands);
            world.addWords(characters);

            let json = {};

            Object.keys(items.weapons).forEach((key) => { 
                (json as any)[(items.weapons as any)[key].name] = "Weapon";          
            });
            Object.keys(items.objects).forEach( (key) => {
                (json as any)[(items.objects as any)[key].name] = "Item";  
            })

            world.addWords(json);
        })
    }

    parse(command: string) : ParserResponse {

        let text = nlp(command);
        let response: ParserResponse = {};

        response.direction = text.match('#Direction').first().text();
        response.action = text.match('#Action').first().text();
        response.noun = text.match('#Noun').first().text();
        response.character = text.match('#Character').first().text();
        response.mob = text.match('#Mob').first().text();
        response.weapon = text.match('#Weapon').first().text();
        response.item = text.match('#Item').first().text();
        
        return response;
    }

}