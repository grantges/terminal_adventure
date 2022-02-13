/*
 * Storage.ts
 *
 * @author: Bert Grantges
 * @description: A storage object derived from the base Item class.
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


import Item from './Item';

enum StorageErrors {
    NONE = "NONE",
    TOO_HEAVY = "TOO_HEAVY",
    STORAGE_FULL = "STORAGE_FULL"
}

class Storage extends Item {

    maxWeight: number;
    currentWeight: number;
    numberOfSlots: number;
    emptySlots: number;
    items: Array<Item>;
    

    constructor(name: string, description: string, weight: number, maxWeight: number = 10, numberOfSlots: number = 5, items: Array<Item> = []){
        
        super(name, description, weight);
        this.maxWeight = maxWeight;
        this.numberOfSlots = numberOfSlots;
        this.emptySlots = numberOfSlots;
        this.currentWeight = 0;
        this.items = items

    }

    /** Private Methods **/
    
    private isItemInStorage(id:string): number {
        return this.items.findIndex((item, index) => (item.id == id))
    }

    /** Public Methods / Accessors **/

    addItem(item: Item) : Error {

        let error = new Error(StorageErrors.NONE);

        if ( (this.currentWeight + item.weight) > this.maxWeight) {
            error.message = StorageErrors.TOO_HEAVY;
        }
        else if(!this.isEmpty) {
            error.message = StorageErrors.STORAGE_FULL;
        }

        this.items.push(item)
        this.currentWeight += item.weight;

        return error;


    }

    removeItemById(id: string): Item | null {

        var item: Item;
        var index: number = this.isItemInStorage(id);
        if(index !== -1){
            item = this.items[index];
            this.items.splice(index, 1);
            this.currentWeight -= item.weight;
            return item;
        }

        return null
        
    }

    listItems() {
        this.items.forEach((item) => console.log(item.name))
    }

    get isEmpty(): boolean {
        return this.numberOfSlots > this.emptySlots;
    }

}