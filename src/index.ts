/*
 * index.ts
 *
 * @author: Bert Grantges
 * @description: Game Setup and Command Processing.
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


import Client from './client/Client';
import Goblin from './libs/Characters/Goblin';
import Player from './libs/Characters/Player';
import { CharacterRace } from './libs/Enums';
import Parser from './parser/Parser';

const commandParser = new Parser();
const client = new Client(processCommand, "Dungeons & Dragons");

var player = new Player(CharacterRace.HUMAN, "Gareth");


gameLoop();


function processCommand(cmd: string) {

    let response = commandParser.parse(cmd);

    if(response.action == 'look' && response.noun == "me"){
        client.appendGameWindowText(player.about());
    }

    if(response.action == 'attack' || 'kill') {
        
        var goblin = new Goblin();
        
        if(goblin && response.mob?.toLowerCase() == 'goblin') {

            client.appendGameWindowText("You challenge a goblin... let's hope this goes well");
            
            var combatants = [player, goblin].sort( (char) => char.initiative );


            while(!player.isDead && !goblin.isDead){

                combatants.forEach( (char, idx ) => {

                    if(!char.isUnconscious) {
                        var challenger = combatants.filter( (c) => c != char );
                        client.appendGameWindowText( (char.name || "The "+char.race) + " attacks " + (challenger[0].name || "the " + challenger[0].race) + " for " + char.attack(challenger[0]) + " points of damage.");
                    }
                    else {
                        client.appendGameWindowText( (char.name || "The "+char.race) + " is unconscious, and can not attack");
                    }
                });
                
                if(goblin.isDead) {
                    client.appendGameWindowText("You have killed a goblin!");
                }
            }

        }
    }
    else {
        client.appendGameWindowText(JSON.stringify(response));
    }

}


function gameLoop() {

    var id = setInterval(() : void => {

        if( player.isDead ) {
            client.appendGameWindowText("You have been killed....");
            client.appendGameWindowText("Game Over");
            clearInterval(id)
        };

    }, 1000);
}

