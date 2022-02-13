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
import grammar from './grammar.json';
import tags from './tags.json';
import items from '../data/items.json';


interface ParserResponse {
    action?: string,
    noun?: string,
    verb?: string,
    object?: string,
    description: string
}


export default class Parser {

    constructor(){
        this.setup()
    }

    setup() {
        nlp.extend((Doc:any, world:any) => {
            world.addTags(tags);
            world.addWords(grammar);
        })
    }

    parse(command: string) : ParserResponse {

        let text = nlp(command);
        let response: ParserResponse = {description: ''};

        switch(text.match('#Action').text()) {

            case 'look':
                response.action = 'look';

                if(text.match('#Noun').text()) {
                    response.noun = text.nouns().text();
                    response.description= (items.objects as any)[response.noun] ? (items.objects as any)[response.noun].description : '';
                }
                else {
                    response.description = "You look around, things are nice...";
                }
                
                break;

            case 'take':
            case 'get':
                response.action = 'get';
                response.description = "After looking around, you decide to take it";
                break;
            
            case 'attack': 
                response.action = 'attack';

                if(text.match('#Noun').text()) {
                    response.description = "You attack the " + text.nouns().text();
                }
                else {
                    response.description = "What do you want to attack? Is there a Grue?"
                }
                
                break;
            
            default: 
                response.description = "I really just don't understand you sometimes..."
        }

        // TODO: Account for Verb and Direction (movement)
        //
        // if(text.has('#Verb') && text.has('#Noun')){
        //     var json = text.json(); 
        // }
        // else if(text.has('#Direction')){
        //     response.direction = "You move " + text.match("#Direction").text();
        // }
        // else {
        //     response.direction = "I'm not sure about that...";
        // }

        return response;
    }

}