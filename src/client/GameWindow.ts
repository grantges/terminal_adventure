/*
 * GameWindow.ts
 *
 * @author: Bert Grantges
 * @description: The main game window, handles the text for the game.
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

export default class GameWindow {

    screen: UI.Widgets.Screen;
    log: UI.Widgets.Log;

    constructor(screen: UI.Widgets.Screen) {

        this.screen = screen;

        this.log = UI.log({
            parent: screen,
            top: 1,
            left: 1,
            right: 30,
            bottom: 4,
            valign:"bottom",
            scrollable: true,
            scrollOnInput: true,
            mouse: true,
            keys: true,
            content: '',
            tags: true,
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                bg: 'black',
                border: {
                fg: '#f0f0f0'
                }
            }
        });

    }

    clear() {
        this.log.setContent('');
    }

    setContent(text: string) {
        this.log.setContent(text)
    }

    appendContent(text: string) {
        this.log.add(text);
    }

}