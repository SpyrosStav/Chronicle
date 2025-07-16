import { useMemo } from 'react';

//Calculates modifiers for Stats, Skills, ST
export function useModifier(attribute,proficiencyMod,isProficient) {
    const modifier = useMemo(() => Math.floor((attribute - 10)/2) +proficiencyMod*isProficient, [attribute]);
    let result;

    if (modifier > 0){
        result = `+${modifier}`;;
    }
    else {
        result = `${modifier}`;
    }

    return result;
}

//Calculates Proficiency modifier
export function useProficiencyModifier(level){
    const proficiencyModifier = useMemo(() => (Math.floor((level - 1) / 4) + 2));

    return proficiencyModifier
}