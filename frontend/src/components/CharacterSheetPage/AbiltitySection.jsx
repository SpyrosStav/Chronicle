import React, {useState, useRef} from 'react'
import {AbilityScoreBlock, SkillBlock} from './AbiltyScoreBlock.jsx';
import {getAbilityModifier, getSkillModifier, getProficiencyModifier, getPassive} from '../../utils/modifiers.js';

export default function AbilitySection({characterData, onStatChange, isEditing}){

    const proficiencyModifier = getProficiencyModifier(characterData.level);
    
    // MAIN STATS MODIFIERS
    const strengthModifier = getAbilityModifier(characterData.strength,proficiencyModifier);
    const dexterityModifier = getAbilityModifier(characterData.dexterity,proficiencyModifier);
    const constitutionModifier = getAbilityModifier(characterData.constitution,proficiencyModifier);
    const intelligenceModifier = getAbilityModifier(characterData.intelligence,proficiencyModifier);
    const wisdomModifier = getAbilityModifier(characterData.wisdom,proficiencyModifier);
    const charismaModifier = getAbilityModifier(characterData.charisma,proficiencyModifier);

    // SKILLS MODIFIERS
    //  STRENGTH SKILLS
    const strengthSTModifier = getSkillModifier(strengthModifier,proficiencyModifier,characterData.skills.Strength_ST);
    const athleticsModifier = getSkillModifier(strengthModifier,proficiencyModifier,characterData.skills.Athletics);
    //  DEXTERITY SKILLS
    const dexteritySTModifier = getSkillModifier(dexterityModifier,proficiencyModifier,characterData.skills.Dexterity_ST);
    const acrobaticsModifier = getSkillModifier(dexterityModifier,proficiencyModifier,characterData.skills.Acrobatics);
    const sleightOfHandModifier = getSkillModifier(dexterityModifier,proficiencyModifier,characterData.skills.Sleight_of_Hand);
    const stealthModifier = getSkillModifier(dexterityModifier,proficiencyModifier,characterData.skills.Stealth);
    //  CONSTITUTION SKILLS
    const constitutionSTModifier = getSkillModifier(constitutionModifier,proficiencyModifier,characterData.skills.Constitution_ST);
    //  INTELLIGENCE SKILLS
    const intelligenceSTModifier = getSkillModifier(intelligenceModifier,proficiencyModifier,characterData.skills.Intelligence_ST);
    const arcanaModifier = getSkillModifier(intelligenceModifier,proficiencyModifier,characterData.skills.Arcana);
    const historyModifier = getSkillModifier(intelligenceModifier,proficiencyModifier,characterData.skills.History);
    const investigationModifier = getSkillModifier(intelligenceModifier,proficiencyModifier,characterData.skills.Investigation);
    const natureModifier = getSkillModifier(intelligenceModifier,proficiencyModifier,characterData.skills.Nature);
    const religionModifier = getSkillModifier(intelligenceModifier,proficiencyModifier,characterData.skills.Religion);
    //  WISDOM SKILLS
    const wisdomSTModifier = getSkillModifier(wisdomModifier,proficiencyModifier,characterData.skills.Wisdom_ST);
    const animalHandlingModifier = getSkillModifier(wisdomModifier,proficiencyModifier,characterData.skills.Animal_Handling);
    const insightModifier = getSkillModifier(wisdomModifier,proficiencyModifier,characterData.skills.Insight);
    const medicineModifier = getSkillModifier(wisdomModifier,proficiencyModifier,characterData.skills.Medicine);
    const perceptionModifier = getSkillModifier(wisdomModifier,proficiencyModifier,characterData.skills.Perception);
    const survivalModifier = getSkillModifier(wisdomModifier,proficiencyModifier,characterData.skills.Survival);
    //  CHARISMA SKILLS
    const charismaSTModifier = getSkillModifier(charismaModifier,proficiencyModifier,characterData.skills.Charisma_ST);
    const deceptionModifier = getSkillModifier(charismaModifier,proficiencyModifier,characterData.skills.Deception);
    const intimidationModifier = getSkillModifier(charismaModifier,proficiencyModifier,characterData.skills.Intimidation);
    const performanceModifier = getSkillModifier(charismaModifier,proficiencyModifier,characterData.skills.Performance);
    const persuationModifier = getSkillModifier(charismaModifier,proficiencyModifier,characterData.skills.Persuation);

    //  PASSIVE SKILLS
    const passivePerceptionModifier = getPassive(perceptionModifier);
    const passiveInsightModifier = getPassive(insightModifier);

    function handleSkillChange(skillName, checked) {
        onStatChange('skills', {
            ...characterData.skills,
            [skillName]: checked,
        });
    }

    return(
        <>
            <div className='text-center' style={{marginBottom:"5px", fontSize:"1.2rem", fontWeight:"600", paddingTop:"10px"}}>ABILITY SCORES</div>
            <div className="profficiencyAttributes">
                <div className="profficiencyBlock backgroundCard">
                    <div className="circle"> {proficiencyModifier > 0 ? (`+${proficiencyModifier}`) : proficiencyModifier}</div>
                    <div className="profficiency-label">PROFICIENCY</div>
                </div>
                <div className="profficiencyBlock backgroundCard">
                    <div className="profficiency-label"> <div>PASSIVE</div><div>PERCEPTION</div> </div>
                    <div className="circle">{passivePerceptionModifier}</div>
                </div>
                <div className="profficiencyBlock backgroundCard">
                    <div className="circle">2</div>
                    <div className="profficiency-label">INSPIRATION</div>
                </div>
                <div className="profficiencyBlock backgroundCard">
                    <div className="profficiency-label"> <div>PASSIVE</div><div>INSIGHT</div> </div>
                    <div className="circle">{passiveInsightModifier}</div>
                </div>
            </div>

            {/* ABILITY SCORES */}
            <div className="AbilityScoresCard">
                

                {/* -- STRENGTH -- */}
                <div className="stat">
                    {/* Ability Score  */}
                    <AbilityScoreBlock abilityScoreName = 'strength' abilityScoreModifier = {strengthModifier} 
                    abilityScoreValue = {characterData.strength} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    {/* Skills and ST */}
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Strength_ST' skillProficiency = {characterData.skills.Strength_ST} 
                        skillModifier = {strengthSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Athletics' skillName = 'Athletics' skillProficiency = {characterData.skills.Athletics} 
                        skillModifier = {athleticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* -- DEXTERITY -- */}
                <div className="stat">
                    {/* Ability Score  */}
                    <AbilityScoreBlock abilityScoreName = 'dexterity' abilityScoreModifier = {dexterityModifier} 
                    abilityScoreValue = {characterData.dexterity} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    {/* Skills and ST */}
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Dexterity_ST' skillProficiency = {characterData.skills.Dexterity_ST} 
                        skillModifier = {dexteritySTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Acrobatics' skillName = 'Acrobatics' skillProficiency = {characterData.skills.Acrobatics} 
                        skillModifier = {acrobaticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Sleight of Hand' skillName = 'Sleight_of_Hand' skillProficiency = {characterData.skills.Sleight_of_Hand} 
                        skillModifier = {sleightOfHandModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Stealth' skillName = 'Stealth' skillProficiency = {characterData.skills.Stealth} 
                        skillModifier = {stealthModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* -- CONSTITUTION -- */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'constitution' abilityScoreModifier = {constitutionModifier} 
                    abilityScoreValue = {characterData.constitution} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Constitution_ST' skillProficiency = {characterData.skills.Constitution_ST} 
                        skillModifier = {constitutionSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- INTELLIGENCE --> */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'intelligence' abilityScoreModifier = {intelligenceModifier} 
                    abilityScoreValue = {characterData.intelligence} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Intelligence_ST' skillProficiency = {characterData.skills.Intelligence_ST} 
                        skillModifier = {intelligenceSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Arcana' skillName = 'Arcana' skillProficiency = {characterData.skills.Arcana} 
                        skillModifier = {arcanaModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'History' skillName = 'History' skillProficiency = {characterData.skills.History} 
                        skillModifier = {historyModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Investigation' skillName = 'Investigation' skillProficiency = {characterData.skills.Investigation} 
                        skillModifier = {investigationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Nature' skillName = 'Nature' skillProficiency = {characterData.skills.Nature} 
                        skillModifier = {natureModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Religion' skillName = 'Religion' skillProficiency = {characterData.skills.Religion} 
                        skillModifier = {religionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- WISDOM --> */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'wisdom' abilityScoreModifier = {wisdomModifier} 
                    abilityScoreValue = {characterData.wisdom} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Wisdom_ST' skillProficiency = {characterData.skills.Wisdom_ST} 
                        skillModifier = {wisdomSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Animal Handling' skillName = 'Animal_Handling' skillProficiency = {characterData.skills.Animal_Handling} 
                        skillModifier = {animalHandlingModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Insight' skillName = 'Insight' skillProficiency = {characterData.skills.Insight} 
                        skillModifier = {insightModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Medicine' skillName = 'Medicine' skillProficiency = {characterData.skills.Medicine} 
                        skillModifier = {medicineModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Perception' skillName = 'Perception' skillProficiency = {characterData.skills.Perception} 
                        skillModifier = {perceptionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Survival' skillName = 'Survival' skillProficiency = {characterData.skills.Survival} 
                        skillModifier = {survivalModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- CHARISMA --> */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'charisma' abilityScoreModifier = {charismaModifier} 
                    abilityScoreValue = {characterData.charisma} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Charisma_ST' skillProficiency = {characterData.skills.Charisma_ST} 
                        skillModifier = {charismaSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Deception' skillName = 'Deception' skillProficiency = {characterData.skills.Deception} 
                        skillModifier = {deceptionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Intimidation' skillName = 'Intimidation' skillProficiency = {characterData.skills.Intimidation} 
                        skillModifier = {intimidationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Performance' skillName = 'Performance' skillProficiency = {characterData.skills.Performance} 
                        skillModifier = {performanceModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Persuation' skillName = 'Persuation' skillProficiency = {characterData.skills.Persuation} 
                        skillModifier = {persuationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>     
            </div>

            <div className="traits"></div> 
        </>
    )
}