/*
 * CommandWindow.ts
 *
 * @author: Bert Grantges
 * @description: Input for the player to input text commands
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


export default class CommandWindow {

    form: any;
    screen: UI.Widgets.Screen;
    submitButton: UI.Widgets.ButtonElement;
    commandInput: UI.Widgets.TextboxElement;
    submitHandler: Function;

    constructor(screen: UI.Widgets.Screen, submitHandler?: Function) {

        this.screen = screen;

        this.form = UI.form({
            parent: screen,
            keys: true,
            left: 1,
            right: 1,
            bottom: 1,
            height: 3,
            bg: 'black',
            content: '>',
            border: {
                type: 'line'
            },
            style:{
                border: {
                    fg: '#f0f0f0'
                },
            }
        });

        this.commandInput = UI.textbox({
            parent: this.form,
            mouse: true,
            keys: true,
            shrink: false,
            input: true,
            inputOnFocus: true,
            padding: {
                left: 1,
                right: 1
            },
            left: 1,
            right: 10,
            height: 1,
            top: 0,
            style: {
                bg: 'black',
                fg: 'white'
            }
        });

        this.submitButton = UI.button({
            parent: this.form,
            mouse: true,
            keys: true,
            shrink: true,
            padding: {
              left: 1,
              right: 1
            },
            right: 1,
            top: 0,
            name: 'submit',
            content: 'submit',
            style: {
              bg: 'blue',
              fg: 'white',
              hover: {
                bg: 'green'
              }
            }
        })

        this.submitHandler = submitHandler ? submitHandler : () => { };
        this.commandInput.key('enter', ()=> { this.form.submit() });
        this.submitButton.on('press', () => { this.form.submit() });
        this.form.on('submit', (data:any) =>{
  
            // process data.textbox
            this.commandInput.clearValue();
            this.form.setContent('>');
          
            this.submitHandler(data.textbox);

            this.focus();
          });

        this.focus();
    }

    focus() {
        this.commandInput.focus();
    }

}