import React, {useState, useRef} from 'react';
import { useAbiltyScoreModifier,useModifier,useProficiencyModifier, usePassiveModifier } from '../../hooks/useModifier';
import { AbilityScoreBlock, SkillBlock } from './AbiltyScoreBlock.jsx';
import { incrementValue, decrementValue} from '../../utils/inputHandler.js';

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

    // REFS
    const inputRefAC = useRef(null);
    const inputRefSpeed = useRef(null);
    const inputRefMHP = useRef(null);
    const inputRefCHP = useRef(null);
    const inputRefTHP = useRef(null);

    function handleSkillChange(skillName, checked) {
        onStatChange('skills', {
            ...char.skills,
            [skillName]: checked,
        });
    }

    return(
    <div className="attributesCard">
        {/* -- LEFT CARD --> PROFICIENCIES, ABILITY SCORES -- */}
        <div className="attribute-group-left">

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
                    abilityScoreValue = {char.strength} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    {/* Skills and ST */}
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Strength_ST' skillProficiency = {char.skills.Strength_ST} 
                        skillModifier = {strengthSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Athletics' skillName = 'Athletics' skillProficiency = {char.skills.Athletics} 
                        skillModifier = {athleticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* -- DEXTERITY -- */}
                <div className="stat">
                    {/* Ability Score  */}
                    <AbilityScoreBlock abilityScoreName = 'dexterity' abilityScoreModifier = {dexterityModifier} 
                    abilityScoreValue = {char.dexterity} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    {/* Skills and ST */}
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Dexterity_ST' skillProficiency = {char.skills.Dexterity_ST} 
                        skillModifier = {dexteritySTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Acrobatics' skillName = 'Acrobatics' skillProficiency = {char.skills.Acrobatics} 
                        skillModifier = {acrobaticsModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Sleight of Hand' skillName = 'Sleight_of_Hand' skillProficiency = {char.skills.Sleight_of_Hand} 
                        skillModifier = {sleightOfHandModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Stealth' skillName = 'Stealth' skillProficiency = {char.skills.Stealth} 
                        skillModifier = {stealthModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* -- CONSTITUTION -- */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'constitution' abilityScoreModifier = {constitutionModifier} 
                    abilityScoreValue = {char.constitution} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Constitution_ST' skillProficiency = {char.skills.Constitution_ST} 
                        skillModifier = {constitutionSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- INTELLIGENCE --> */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'intelligence' abilityScoreModifier = {intelligenceModifier} 
                    abilityScoreValue = {char.intelligence} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Intelligence_ST' skillProficiency = {char.skills.Intelligence_ST} 
                        skillModifier = {intelligenceSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Arcana' skillName = 'Arcana' skillProficiency = {char.skills.Arcana} 
                        skillModifier = {arcanaModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'History' skillName = 'History' skillProficiency = {char.skills.History} 
                        skillModifier = {historyModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Investigation' skillName = 'Investigation' skillProficiency = {char.skills.Investigation} 
                        skillModifier = {investigationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Nature' skillName = 'Nature' skillProficiency = {char.skills.Nature} 
                        skillModifier = {natureModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Religion' skillName = 'Religion' skillProficiency = {char.skills.Religion} 
                        skillModifier = {religionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- WISDOM --> */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'wisdom' abilityScoreModifier = {wisdomModifier} 
                    abilityScoreValue = {char.wisdom} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Wisdom_ST' skillProficiency = {char.skills.Wisdom_ST} 
                        skillModifier = {wisdomSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Animal Handling' skillName = 'Animal_Handling' skillProficiency = {char.skills.Animal_Handling} 
                        skillModifier = {animalHandlingModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Insight' skillName = 'Insight' skillProficiency = {char.skills.Insight} 
                        skillModifier = {insightModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Medicine' skillName = 'Medicine' skillProficiency = {char.skills.Medicine} 
                        skillModifier = {medicineModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Perception' skillName = 'Perception' skillProficiency = {char.skills.Perception} 
                        skillModifier = {perceptionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Survival' skillName = 'Survival' skillProficiency = {char.skills.Survival} 
                        skillModifier = {survivalModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>

                {/* <!-- CHARISMA --> */}
                <div className="stat">
                    <AbilityScoreBlock abilityScoreName = 'charisma' abilityScoreModifier = {charismaModifier} 
                    abilityScoreValue = {char.charisma} isEditing = {isEditing} onStatChange = {onStatChange}/>
                    <div className="skillChecks">
                        <SkillBlock name = 'Saving Throws' skillName = 'Charisma_ST' skillProficiency = {char.skills.Charisma_ST} 
                        skillModifier = {charismaSTModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Deception' skillName = 'Deception' skillProficiency = {char.skills.Deception} 
                        skillModifier = {deceptionModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Intimidation' skillName = 'Intimidation' skillProficiency = {char.skills.Intimidation} 
                        skillModifier = {intimidationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Performance' skillName = 'Performance' skillProficiency = {char.skills.Performance} 
                        skillModifier = {performanceModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                        <SkillBlock name = 'Persuation' skillName = 'Persuation' skillProficiency = {char.skills.Persuation} 
                        skillModifier = {persuationModifier} isEditing = {isEditing} onSkillChange = {handleSkillChange}/>
                    </div>
                </div>     
            </div>

            <div className="traits"></div>

        </div>

        {/*Middle Card (HP, Weapons, Class Specifics)*/}
        <div className="attribute-group-middle">

            <div className="combatStats backgroundCard mb-3">
                <div className='text-center' style={{marginBottom:"5px", fontSize:"1.2rem", fontWeight:"600"}}>COMBAT STATS</div>
                {/* AC, INITIATIVE, SPEED */}
                <div className="row mb-4 acInitiativeSpeedRow">
                    <div className="col-4">
                        <div className="p-2 shield lightBackground">
                            <div className="shield-label">AC</div>
                            {isEditing ? (
                                <div className='number-input-wrapper mb-0'>
                                    <input
                                        type="number" ref={inputRefAC}
                                        id='custom-number' className="shield-value"
                                        min={0}
                                        style={{border:"none"}} value={char.ac}
                                        onChange={(e) => onStatChange('ac', parseInt(e.target.value))}
                                    />
                                    <div className="spinner-buttons">
                                        <button className='up' onClick={() => {incrementValue('ac',inputRefAC,onStatChange)}}></button>
                                        <button className='down' onClick={() => {decrementValue('ac',inputRefAC,onStatChange)}}></button>
                                    </div>
                                </div>
                                ) : (
                                <div className="shield-value">{char.ac}</div>
                            )}
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-2 initiative lightBackground">
                            <div className="initiative-label">Initiative</div>
                            <div className="initiative-value">+{dexterityModifier}</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-2 speed lightBackground">
                            <div className="speed-label">Speed</div>
                            {isEditing ? (
                                <div className='number-input-wrapper mb-0'>
                                    <input
                                        type="number" ref={inputRefAC}
                                        id='custom-number' className="speed-value"
                                        min={0}
                                        style={{border:"none"}} value={char.speed}
                                        onChange={(e) => onStatChange('speed', parseInt(e.target.value))}
                                    />
                                    <div className="spinner-buttons">
                                        <button className='up' onClick={() => {incrementValue('speed',inputRefSpeed,onStatChange)}}></button>
                                        <button className='down' onClick={() => {decrementValue('speed',inputRefSpeed,onStatChange)}}></button>
                                    </div>
                                </div>
                                ) : (
                                <div className="speed-value">{char.speed}ft</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* HP CARD */}
                <div className="row mb-4 hpRow">
                    <div className="col-4">
                        {/* MAX HP */}
                        <div className="p-2  HPCard lightBackground">
                            <div className='maxHPSection'>
                                <div className="maxHP-label text-center">Maximum HP</div>
                                {isEditing ? (
                                    <div className='number-input-wrapper mb-0'>
                                        <input
                                            type="number" ref={inputRefMHP}
                                            id='custom-number' className="maxHP"
                                            min={0}
                                            style={{border:"none", width: "60px"}} value={char.max_hp}
                                            onChange={(e) => onStatChange('max_hp', parseInt(e.target.value))}
                                        />
                                        <div className="spinner-buttons">
                                            <button className='up' onClick={() => {incrementValue('max_hp',inputRefMHP,onStatChange)}}></button>
                                            <button className='down' onClick={() => {decrementValue('max_hp',inputRefMHP,onStatChange)}}></button>
                                        </div>
                                    </div>
                                    ) : (
                                    <div className="maxHP ">{char.max_hp}</div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        {/* CURRENT HP */}
                        <div className="currentHPSection lightBackground">
                            <div className="currentHP-label text-center">Current HP</div>
                            {isEditing ? (
                                <div className='number-input-wrapper mb-0'>
                                    <input
                                        type="number" ref={inputRefCHP}
                                        id='custom-number' className="currentHP"
                                        min={0} max={char.max_hp}
                                        style={{border:'none'}} value={char.c_hp}
                                        onChange={(e) => onStatChange('c_hp', parseInt(e.target.value))}
                                    />
                                    <div className="spinner-buttons">
                                        <button className='up' onClick={() => {incrementValue('c_hp',inputRefCHP,onStatChange)}}></button>
                                        <button className='down' onClick={() => {decrementValue('c_hp',inputRefCHP,onStatChange)}}></button>
                                    </div>
                                </div>
                            ) : (
                            <div className="currentHP">{char.c_hp}</div>
                        )}
                        </div>
                    </div>

                    {/* TEMPORARY HP */}
                    <div className="col-4">
                        <div className="p-2 tempHPSection lightBackground">
                            <div className="tempHP-label">Temporary HP</div>
                            {isEditing ? (
                                <div className='number-input-wrapper mb-0'>
                                    <input
                                        type="number" ref={inputRefTHP}
                                        id='custom-number' className="tempHP"
                                        style={{border:'none', width:"100%"}} value={char.temp_hp}
                                        onChange={(e) => onStatChange('temp_hp', parseInt(e.target.value))}
                                    />
                                    <div className="spinner-buttons">
                                        <button className='up' onClick={() => {incrementValue('temp_hp',inputRefTHP,onStatChange)}}></button>
                                        <button className='down' onClick={() => {decrementValue('temp_hp',inputRefTHP,onStatChange)}}></button>
                                    </div>
                                </div>
                                ) : (
                                <div className="tempHP">{char.temp_hp}</div>
                            )}
                            
                        </div>
                    </div>
                </div>

                {/* HIT DIE, DEATH SAVES */}
                <div className="row mb-4 hitDiceDSRow">
                    <div className="col-6">
                            <div className='hitDice-label'>Hit Dice</div>
                        <div className="p-2 hitDice lightBackground">
                            {/* <hr style={{borderColor:"black", margin:"0", height:"1px", width:"50%", position:"relative", left:"25%"}}/> */}
                            <div className='hitDiceContainer'>
                                <div className=''>
                                    <span>Used</span>
                                    <div>{char.hit_die}</div>
                                </div>
                                <div className=''>
                                    <span>Total</span>
                                    <div>{char.level}</div>
                                </div>
                            </div>
                            {/* <div className='circle'>HD</div> */}
                        </div>
                    </div>
                    <div className="col-6">
                            <div className='deathSaves-label'>Death Saves</div>
                        <div className="p-2 deathSaves lightBackground">
                            <div className='deathSavesContainer'>
                                <div className="dsSuccess">
                                    <div style={{display:'inline-block'}}>Successes</div>
                                    <div className="death-saves-successes-checkbox" style={{display:'inline-block'}}>
                                        {[0, 1, 2].map((i) => (
                                            <input
                                            key={i}
                                            type="checkbox"
                                            checked={char.death_saves_success > i}
                                            readOnly
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="dsFail">
                                    <div style={{display:'inline-block'}}>Failures</div>
                                    <div className="death-saves-failures-checkbox" style={{display:'inline-block'}}>
                                        {[0, 1, 2].map((i) => (
                                            <input
                                            key={i}
                                            type="checkbox"
                                            checked={char.death_saves_fail > i}
                                            readOnly
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* WEAPONS */}
            <div className="weaponsCard backgroundCard ">
                <div className='weapons-label'>WEAPONS</div>

                <p>Name</p><p>Atk Bonus</p><p>Damage</p><p>Type</p>

                {char.weapons.map((weapon) => (
                    <React.Fragment key={weapon.weapon_id}>
                        <div>{weapon.name}</div>
                        <div>{weapon.atk_bonus > 0 ? (`+${weapon.atk_bonus}`) : weapon.atk_bonus}</div>
                        <div>{weapon.num_of_die}d{weapon.damage_die} {weapon.extra_damage > 0 ? (`+${weapon.extra_damage}`) : weapon.extra_damage}</div>
                        <div>{weapon.damage_type}</div>
                    </React.Fragment>
                ))}
            </div>

            {/* SPECIFIC CLASS CARD (E.G. SPELLCASTING) */}
            <div className="charclassAbilities">

            </div>

        </div>

        {/* FREE TEXT CARD FOR CLASS SKILLS */}
        <div className="attribute-group-right" >
            <div className="charclassFeatures">
                
            </div>
        </div>
    </div>
    )
}

export default MainCard;