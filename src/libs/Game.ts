
import { v4 as uuid } from "uuid";
import Player from './Characters/Player';
const GAME_CLOCK_HOUR = 240;


export default class Game {

    id: string;
    isActive: boolean;
    players: Player[] | undefined;
    gameTimeId: ReturnType<typeof setInterval>;
    gameTime: number;


    constructor() {
        
        this.id = uuid();
        this.isActive = true;
        this.gameTime = 0;

        this.gameTimeId = setInterval( this.tick, GAME_CLOCK_HOUR*1000);
    }

    get isInCombat(): boolean {

        var isInCombat = false;
        if(this.players && this.players.length) {
            this.players.forEach( (player) => { 
                if(player.inCombat) { 
                    isInCombat = true; 
                } 
            });
        }

        return isInCombat;
    }

    tick() {
        this.gameTime += GAME_CLOCK_HOUR;
        if(this.players && this.players.length) {
            this.players.forEach( (player) => { 
                
                player.rations -= 0.5;

            });
        }

    }



    // TODO - Handle Saving and Loading the game.
    
}