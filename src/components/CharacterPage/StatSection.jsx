import React, {useState} from 'react';

export function AbilityScoreSection({abilityScoreName,abilityScoreModifier,abilityScoreValue,isEditing, onStatChange}){
    return (
        <div className="statValue bg-light">
            <div className="attributeName">{abilityScoreName.toUpperCase()}</div>
            <div className="modifier">{abilityScoreModifier > 0 ? (`+${abilityScoreModifier}`) : abilityScoreModifier}</div>
            {isEditing ? (
                <input
                    type="number"
                    min={1}
                    max={20}
                    className="abilityScore"
                    value={abilityScoreValue}
                    onChange={(e) => onStatChange(abilityScoreName, parseInt(e.target.value))}
                />
                ) : (
                <div className="abilityScore">{abilityScoreValue}</div>
            )}
        </div>
    )
}

export function SkillSection({name, skillName,skillProficiency,skillModifier,isEditing, onSkillChange}){
    return (
        <div>
            <input type="checkbox" checked={skillProficiency || false}
                onChange={(e) => {
                        onSkillChange(skillName,e.target.checked);
                    }}
                disabled={!isEditing}>
            </input> 
            {name}: {skillModifier > 0 ? `+${skillModifier}` : skillModifier}
        </div>
    )
}