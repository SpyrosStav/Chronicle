import React, {useState, useRef} from 'react';

export function AbilityScoreBlock({abilityScoreName,abilityScoreModifier,abilityScoreValue,isEditing, onStatChange}){
    const inputRef = useRef(null);

    const increment = () => {
        if (inputRef.current) {
        inputRef.current.stepUp();
        onStatChange(abilityScoreName, parseInt(inputRef.current.value));
        }
    };

    const decrement = () => {
        if (inputRef.current) {
        inputRef.current.stepDown();
        onStatChange(abilityScoreName, parseInt(inputRef.current.value));
        }
    };

    return (
        <div className="statValue backgroundCard">
            <div className="attributeName">{abilityScoreName.toUpperCase()}</div>
            <div className="modifier">
                {abilityScoreModifier > 0 
                ? (`+${abilityScoreModifier}`) 
                : abilityScoreModifier}
            </div>
            {isEditing ? (
                <div className='number-input-wrapper'>
                    <input
                        ref={inputRef}
                        type="number"
                        min={1}
                        max={20}
                        className="abilityScore"
                        id='custom-number'
                        value={abilityScoreValue}
                        onChange={(e) => onStatChange(abilityScoreName, parseInt(e.target.value))}
                    />
                    <div className="spinner-buttons">
                        <button className='up' onClick={() => {increment()}}></button>
                        <button className='down' onClick={() => {decrement()}}></button>
                    </div>
                </div>
                ) : (
                <div className="abilityScore">{abilityScoreValue}</div>
            )}
        </div>
    )
}

export function SkillBlock({name, skillName,skillProficiency,skillModifier,isEditing, onSkillChange}){
    return (
        <div>
            <input type="checkbox" className='me-1' checked={skillProficiency || false}
                onChange={(e) => {
                        onSkillChange(skillName,e.target.checked);
                    }}
                disabled={!isEditing}>
            </input> 
            {name}: {skillModifier > 0 ? `+${skillModifier}` : skillModifier}
        </div>
    )
}



function increment() {
    inputValue.stepUp();
}

function decrement() {
    inputValue.stepDown();
}