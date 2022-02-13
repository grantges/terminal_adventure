/*
 * PlayerWindow.ts
 *
 * @author: Bert Grantges
 * @description: The player window for holding stats etc about the player(s)
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

export default class PlayerWindow {

    screen: UI.Widgets.Screen;
    windowTitle: UI.Widgets.BoxElement;
    window: UI.Widgets.BoxElement;

    constructor(screen: UI.Widgets.Screen) {

        this.screen = screen;

        this.window = UI.box({
            parent: this.screen,
            top: 1,
            right: 1,
            width: 28,
            bottom: 4,
            scrollable: true,
            scrollOnInput: true,
            mouse: true,
            keys: true,
            content: __dirname,
            tags: true,
            padding: {
                top: 1,
                bottom: 1,
                left: 1,
                right: 1
            },
            border: {
                type: 'line'
            },
            style: {
                fg: 'white',
                border: {
                fg: '#f0f0f0'
                }
            }
        });
        
        this.windowTitle = UI.box({
            parent: this.screen,
            top: 1,
            height: 1,
            right: 10,
            width: 10,
            align: 'center',
            content: '{bold}Player{/bold}',
            tags: true,
            style:{
                //bg: 'black',
                fg: 'white'
            }
        });

    }

    get title(): string {
        return this.windowTitle.getContent();
    }

    set title(text: string) {
        this.windowTitle.setContent(text);
    }

    clear() {
        this.window.setContent('');
    }

    setContent(text: string) {
        this.window.setContent(text)
    }

    appendContent(text: string) {
        this.window.setContent(text);
    }

}