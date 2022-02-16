/*
 * Item.ts
 *
 * @author: Bert Grantges
 * @description: Base Item class
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

import items from '../data/items.json';
import { v4 as uuid } from "uuid";

export default class Item implements Item {

    id: string;
    reference: JSON;
    name: string;
    description: string;
    weight: number;

    constructor( type: string, key: string){
        
        this.id = uuid();
        this.reference = (items as any)[type][key];
        this.name = (this.reference as any).name;
        this.description = (this.reference as any).description;
        this.weight = (this.reference as any).weight;
        
        console.log("ITEM");
        console.log(this.name);
    }

    static lookup(type:string, key:string): JSON {
        return (items as any)[type][key];
    }

}





