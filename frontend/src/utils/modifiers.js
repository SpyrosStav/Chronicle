// Calculates Abilty Score Modifier
export function getAbilityModifier(score) {
    return Math.floor((score - 10) / 2);
}

// Calculates Skill Modifier
export function getSkillModifier(abiltyMod,profBonus,isProficient) {
    return abiltyMod + (profBonus * isProficient);
}

// Calculates Proficiency Modifier
export function getProficiencyModifier(level){
    return Math.floor((level - 1) / 4) + 2;
}

// Calculates Passive Skill Modifier
export function getPassive(value){
    return value + 10;
}