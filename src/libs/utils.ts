var Dice = require('roll');


export function calculateModifier(stat: number): number {
    const modifierTable = [-5,-4,-4,-3,-3,-2,-2,-1,-1,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10];
    return modifierTable[stat-1];
}

export function calculateProficiencyBonus(level: number): number {
    const proficiencyTable = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6]
    return proficiencyTable[level-1];
}

export function roll(param:string){

    const dice = new Dice();
    return dice.roll(param).result;
    
}

export function rollAbilityScore() : number {

    const dice = new Dice();

    // Filters the array so that only the top 3 numbers are used to
    // calculate the ability score
    var transform = (results: number[]) => {
        var isFirst = true;
        var min = Math.min(...results);

        return results.filter( (n: number) => {
            var result =  isFirst ? n !== min : n;
            if(n == min) { isFirst = false; }
            return result;
        });
    }

    return dice.roll({
        quantity: 4,
        sides: 6,
        transformations: [transform, 'sum']
    }).result;

}