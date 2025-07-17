import React, {useState} from 'react';
import { useAbiltyScoreModifier,useModifier,useProficiencyModifier, usePassiveModifier } from '../hooks/useModifier';
import { AbilityScoreSection, SkillSection } from './StatSection';

function MainCard({char, onStatChange, isEditing}){
    
    // PROFICIENCY MODIFIER
    const proficiencyModifier = useProficiencyModifier(char.level);

    
    // MAIN STATS MODIFIERS
    const strengthModifier = useAbiltyScoreModifier(char.strength,proficiencyModifier);
    const dexterityModifier = useAbiltyScoreModifier(char.dexterity,proficiencyModifier);
    const constitutionModifier = useAbiltyScoreModifier(char.constitution,proficiencyModifier);
    const intelligenceModifier = useAbiltyScoreModifier(char.intelligence,proficiencyModifier);
    const wisdomModifier = useAbiltyScoreModifier(char.wisdom,proficiencyModifier);
    const charismaModifier = useAbiltyScoreModifier(char.charisma,proficiencyModifier);

    // SKILLS MODIFIERS
    //  STRENGTH SKILLS
    const strengthSTModifier = useModifier(strengthModifier,proficiencyModifier,char.skills.Strength_ST);
    const athleticsModifier = useModifier(strengthModifier,proficiencyModifier,char.skills.Athletics);
    //  DEXTERITY SKILLS
    const dexteritySTModifier = useModifier(dexterityModifier,proficiencyModifier,char.skills.Dexterity_ST);
    const acrobaticsModifier = useModifier(dexterityModifier,proficiencyModifier,char.skills.Acrobatics);
    const sleightOfHandModifier = useModifier(dexterityModifier,proficiencyModifier,char.skills.Sleight_of_Hand);
    const stealthModifier = useModifier(dexterityModifier,proficiencyModifier,char.skills.Stealth);
    //  CONSTITUTION SKILLS
    const constitutionSTModifier = useModifier(constitutionModifier,proficiencyModifier,char.skills.Constitution_ST);
    //  INTELLIGENCE SKILLS
    const intelligenceSTModifier = useModifier(intelligenceModifier,proficiencyModifier,char.skills.Intelligence_ST);
    const arcanaModifier = useModifier(intelligenceModifier,proficiencyModifier,char.skills.Arcana);
    const historyModifier = useModifier(intelligenceModifier,proficiencyModifier,char.skills.History);
    const investigationModifier = useModifier(intelligenceModifier,proficiencyModifier,char.skills.Investigation);
    const natureModifier = useModifier(intelligenceModifier,proficiencyModifier,char.skills.Nature);
    const religionModifier = useModifier(intelligenceModifier,proficiencyModifier,char.skills.Religion);
    //  WISDOM SKILLS
    const wisdomSTModifier = useModifier(wisdomModifier,proficiencyModifier,char.skills.Wisdom_ST);
    const animalHandlingModifier = useModifier(wisdomModifier,proficiencyModifier,char.skills.Animal_Handling);
    const insightModifier = useModifier(wisdomModifier,proficiencyModifier,char.skills.Insight);
    const medicineModifier = useModifier(wisdomModifier,proficiencyModifier,char.skills.Medicine);
    const perceptionModifier = useModifier(wisdomModifier,proficiencyModifier,char.skills.Perception);
    const survivalModifier = useModifier(wisdomModifier,proficiencyModifier,char.skills.Survival);
    //  CHARISMA SKILLS
    const charismaSTModifier = useModifier(charismaModifier,proficiencyModifier,char.skills.Charisma_ST);
    const deceptionModifier = useModifier(charismaModifier,proficiencyModifier,char.skills.Deception);
    const intimidationModifier = useModifier(charismaModifier,proficiencyModifier,char.skills.Intimidation);
    const performanceModifier = useModifier(charismaModifier,proficiencyModifier,char.skills.Performance);
    const persuationModifier = useModifier(charismaModifier,proficiencyModifier,char.skills.Persuation);

    //  PASSIVE SKILLS
    const passivePerceptionModifier = usePassiveModifier(perceptionModifier);
    const passiveInsightModifier = usePassiveModifier(insightModifier);

    

    function handleSkillChange(skillName, checked) {
        onStatChange('skills', {
            ...char.skills,
            [skillName]: checked,
        });
    }

    return(
    <div className="attributesCard">
        {/* -- LEFT CARD --> PROFICIENCIES, ABILITY SCORES -- */}
        <div className="leftAttributesCard">

            <div className="profAttributes">
                <div className="profBlock bg-light">
                    <div className="circle"> {proficiencyModifier > 0 ? (`+${proficiencyModifier}`) : proficiencyModifier}</div>
                    <div className="prof-label">PROFICIENCY</div>
                </div>
                <div className="profBlock bg-light">
                    <div className="prof-label"> <div>PASSIVE</div><div>PERCEPTION</div> </div>
                    <div className="circle">{passivePerceptionModifier}</div>
                </div>
                <div className="profBlock bg-light">
                    <div className="circle">2</div>
                    <div className="prof-label">INSPIRATION</div>
                </div>
                <div className="profBlock bg-light">
                    <div className="prof-label"> <div>PASSIVE</div><div>INSIGHT</div> </div>
                    <div className="circle">{passiveInsightModifier}</div>
                </div>
            </div>

            {/* ABILITY SCORES */}
            <div className="AbilityScoresCard">

                {/* -- STRENGTH -- */}
                <div className="stat">
                    {/* Ability Score  */}
                    <AbilityScoreSection abilityScoreName = 'strength' abilityScoreModifier = {strengthModifier} 
                    abilityScoreValue = {char.strength} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    {/* Skills and ST */}
                    <div className="skillChecks">
                        <SkillSection name = 'Saving Throws' skillName = 'Strength_ST' skillProficiency = {char.skills.Strength_ST} 
                        skillModifier = {strengthSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Athletics' skillName = 'Athletics' skillProficiency = {char.skills.Athletics} 
                        skillModifier = {athleticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* -- DEXTERITY -- */}
                <div className="stat">
                    {/* Ability Score  */}
                    <AbilityScoreSection abilityScoreName = 'dexterity' abilityScoreModifier = {dexterityModifier} 
                    abilityScoreValue = {char.dexterity} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    {/* Skills and ST */}
                    <div className="skillChecks">
                        <SkillSection name = 'Saving Throws' skillName = 'Dexterity_ST' skillProficiency = {char.skills.Dexterity_ST} 
                        skillModifier = {dexteritySTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Acrobatics' skillName = 'Acrobatics' skillProficiency = {char.skills.Acrobatics} 
                        skillModifier = {acrobaticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Sleight of Hand' skillName = 'Sleight_of_Hand' skillProficiency = {char.skills.Sleight_of_Hand} 
                        skillModifier = {sleightOfHandModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Acrobatics' skillName = 'Acrobatics' skillProficiency = {char.skills.Acrobatics} 
                        skillModifier = {acrobaticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Stealth' skillName = 'Stealth' skillProficiency = {char.skills.Stealth} 
                        skillModifier = {stealthModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* -- CONSTITUTION -- */}
                <div className="stat">
                    <AbilityScoreSection abilityScoreName = 'constitution' abilityScoreModifier = {constitutionModifier} 
                    abilityScoreValue = {char.constitution} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillSection name = 'Saving Throws' skillName = 'Constitution_ST' skillProficiency = {char.skills.Constitution_ST} 
                        skillModifier = {constitutionSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- INTELLIGENCE --> */}
                <div className="stat">
                    <AbilityScoreSection abilityScoreName = 'intelligence' abilityScoreModifier = {intelligenceModifier} 
                    abilityScoreValue = {char.intelligence} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillSection name = 'Saving Throws' skillName = 'Intelligence_ST' skillProficiency = {char.skills.Intelligence_ST} 
                        skillModifier = {intelligenceSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Arcana' skillName = 'Arcana' skillProficiency = {char.skills.Arcana} 
                        skillModifier = {arcanaModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'History' skillName = 'History' skillProficiency = {char.skills.History} 
                        skillModifier = {historyModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Investigation' skillName = 'Investigation' skillProficiency = {char.skills.Investigation} 
                        skillModifier = {investigationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Nature' skillName = 'Nature' skillProficiency = {char.skills.Nature} 
                        skillModifier = {natureModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Religion' skillName = 'Religion' skillProficiency = {char.skills.Religion} 
                        skillModifier = {religionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- WISDOM --> */}
                <div className="stat">
                    <AbilityScoreSection abilityScoreName = 'wisdom' abilityScoreModifier = {wisdomModifier} 
                    abilityScoreValue = {char.wisdom} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillSection name = 'Saving Throws' skillName = 'Wisdom_ST' skillProficiency = {char.skills.Wisdom_ST} 
                        skillModifier = {wisdomSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Animal Handling' skillName = 'Animal_Handling' skillProficiency = {char.skills.Animal_Handling} 
                        skillModifier = {animalHandlingModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Insight' skillName = 'Insight' skillProficiency = {char.skills.Insight} 
                        skillModifier = {insightModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Medicine' skillName = 'Medicine' skillProficiency = {char.skills.Medicine} 
                        skillModifier = {medicineModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Perception' skillName = 'Perception' skillProficiency = {char.skills.Perception} 
                        skillModifier = {perceptionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Survival' skillName = 'Survival' skillProficiency = {char.skills.Survival} 
                        skillModifier = {survivalModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- CHARISMA --> */}
                <div className="stat">
                    <AbilityScoreSection abilityScoreName = 'charisma' abilityScoreModifier = {charismaModifier} 
                    abilityScoreValue = {char.charisma} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillSection name = 'Saving Throws' skillName = 'Charisma_ST' skillProficiency = {char.skills.Charisma_ST} 
                        skillModifier = {charismaSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Deception' skillName = 'Deception' skillProficiency = {char.skills.Deception} 
                        skillModifier = {deceptionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Intimidation' skillName = 'Intimidation' skillProficiency = {char.skills.Intimidation} 
                        skillModifier = {intimidationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Performance' skillName = 'Performance' skillProficiency = {char.skills.Performance} 
                        skillModifier = {performanceModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillSection name = 'Persuation' skillName = 'Persuation' skillProficiency = {char.skills.Persuation} 
                        skillModifier = {persuationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>     
            </div>

            <div className="traits"></div>

        </div>

        {/*Middle Card (HP, Weapons, Class Specifics)*/}
        <div className="middleAttributesCard">

            <div className="combatStats">
                {/* AC, INITIATIVE, SPEED */}
                <div className="row mb-4 firstRow">
                    <div className="col-4">
                        <div className="p-3 border bg-light shield">
                            <div className="shield-label">AC</div>
                            {isEditing ? (
                                <input
                                    type="number"
                                    className="shield-value bg-light"
                                    style={{border:'none'}}
                                    value={char.ac}
                                    onChange={(e) => onStatChange('ac', parseInt(e.target.value))}
                                />
                                ) : (
                                <div className="shield-value">{char.ac}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-3 border bg-light initiative">
                            <div className="initiative-label">Initiative</div>
                            <div className="initiative-value">+{dexterityModifier}</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-3 border bg-light speed">
                            <div className="initiative-label">Speed</div>
                            {isEditing ? (
                                <input
                                    type="number"
                                    className="initiative-value bg-light"
                                    style={{border:'none'}}
                                    value={char.speed}
                                    onChange={(e) => onStatChange('speed', parseInt(e.target.value))}
                                />
                                ) : (
                                <div className="initiative-value">{char.speed}ft</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* HP CARD */}
                <div className="row mb-4 secondRow">
                    <div className="col-8">
                        {/* MAX HP */}
                        <div className="p-3 border bg-light HPCard divshadow">
                            {isEditing ? (
                                <input
                                    type="number"
                                    className="maxHP bg-light"
                                    style={{border:'none'}}
                                    value={char.max_hp}
                                    onChange={(e) => onStatChange('max_hp', parseInt(e.target.value))}
                                />
                                ) : (
                                <div className="maxHP bg-light">{char.max_hp}</div>
                            )}
                            <div className="bg-light maxHP-label">Hit Point Maximum</div>

                            {/* CURRENT HP */}
                            <div className="currentHPSection">
                                <div className="currentHP-label">Current Hit Points</div>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        className="currentHP bg-light"
                                        style={{border:'none'}}
                                        value={char.c_hp}
                                        onChange={(e) => onStatChange('c_hp', parseInt(e.target.value))}
                                    />
                                ) : (
                                <div className="currentHP">{char.c_hp}</div>
                            )}
                            </div>
                        </div>
                    </div>

                    {/* TEMPORARY HP */}
                    <div className="col-4">
                        <div className="p-3 pt-0 border bg-light tempHPSection divshadow">
                            <div className="tempHP-label">Temporary <br></br> Hit Points</div>
                            {isEditing ? (
                                    <input
                                        type="number"
                                        className="tempHP bg-light"
                                        style={{border:'none', width:"80px"}}
                                        value={char.temp_hp}
                                        onChange={(e) => onStatChange('temp_hp', parseInt(e.target.value))}
                                    />
                                ) : (
                                <div className="tempHP">{char.temp_hp}</div>
                            )}
                            
                        </div>
                    </div>
                </div>

                {/* HIT DIE, DEATH SAVES */}
                <div className="row mb-4 thirdRow">
                    <div className="col-6">
                        <div className="p-3 border bg-light divshadow hitdie">F

                        </div>
                    </div>
                    <div className="col-6">
                        <div className="p-3 border bg-light divshadow deathsaves">G

                        </div>
                    </div>
                </div>
            </div>

            {/* WEAPONS */}
            <div className="weaponsCard bg-light divshadow">
                <h4>WEAPONS</h4>

                <p>Name</p><p>Atk Bonus</p><p>Damage</p><p>Type</p>

                <div>Crossbow</div><div>+3</div><div>1d6 +5</div><div>Piercing</div>

                <div>Rapier</div><div>+9</div><div>1d8 +7</div><div>Piercing</div>

                <div>Dagger</div><div>+3</div><div>1d4 +4</div><div>Piercing</div>
            </div>

            {/* SPECIFIC CLASS CARD (E.G. SPELLCASTING) */}
            <div className="charclassAbilities"></div>

        </div>

        {/* FREE TEXT CARD FOR CLASS SKILLS */}
        <div className="rightAttributesCard" style={{border: '2px solid black'}}>
            <div className="charclassFeatures"></div>
        </div>
    </div>
    )
}

export default MainCard;