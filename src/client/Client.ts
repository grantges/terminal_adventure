/*
 * Client.ts
 *
 * @author: Bert Grantges
 * @description: The overall GUI for the game. Sets up the game window, player window and the command input form.
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


import * as UI from 'blessed';
import CommandWindow from './CommandWindow';

import { TextDecoderStream } from 'stream/web';
import GameWindow from './GameWindow';
import PlayerWindow from './PlayerWindow';

export default class Client {

    private program: UI.BlessedProgram;
    private screen: UI.Widgets.Screen;
    private commandWindow: CommandWindow;
    private gameWindow: GameWindow;
    private playerWindow: PlayerWindow;

    constructor(commandHandler: Function, title?: string) {

        this.program = UI.program({name:"GAME"});
        this.screen = UI.screen({ smartCSR: true });
        this.screen.title = title || "Game Client";

        this.gameWindow = new GameWindow(this.screen);
        this.playerWindow = new PlayerWindow(this.screen);
        this.commandWindow = new CommandWindow(this.screen, commandHandler);

        this.setupClientHandlers();
        
        this.screen.render();

    }

    get title(): string {
        return this.screen.title;
    }
    
    set title(title: string) {
        this.screen.title = title;
    }

    setupClientHandlers() {

        // Exit Command
        this.program.key(['C-q'],() => {
            return process.exit(0);
        })

    }

    clearGameWindowText() {
        this.gameWindow.setContent('');
    }

    appendGameWindowText(text: string) {
        this.gameWindow.appendContent(text);
    }

    render() {
        this.screen.render();
    }
}