import { useMemo } from 'react';

//Calculates modifiers for Stats, Skills, ST
export function useAbiltyScoreModifier(attribute) {
    const modifier = useMemo(() => Math.floor((attribute - 10)/2),  [attribute]);
    return modifier
}

export function useModifier(abiltyScoreModifier,proficiencyMod,isProficient) {
    const modifier = useMemo(() => abiltyScoreModifier +proficiencyMod*isProficient, [abiltyScoreModifier, proficiencyMod, isProficient]);
    return modifier
}

//Calculates Proficiency modifier
export function useProficiencyModifier(level){
    const proficiencyModifier = useMemo(() => (Math.floor((level - 1) / 4) + 2));
    return proficiencyModifier
}

export function usePassiveModifier(value){
    const passiveModifier = useMemo(() => value + 10, [value])
    return passiveModifier
}