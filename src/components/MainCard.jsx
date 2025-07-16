import React, {useState} from 'react';
import { useModifier } from '../hooks/useModifier';
import { useProficiencyModifier } from '../hooks/useModifier';

function MainCard({char, onStatChange, isEditing}){
    
    // PROFICIENCY MODIFIER
    const proficiencyModifier = useProficiencyModifier(char.level);
    
    // MAIN STATS MODIFIERS
    const strengthModifier = useModifier(char.strength,proficiencyModifier,0);
    const dexterityModifier = useModifier(char.dexterity,proficiencyModifier,0);
    const constitutionModifier = useModifier(char.constitution,proficiencyModifier,0);
    const intelligenceModifier = useModifier(char.intelligence,proficiencyModifier,0);
    const wisdomModifier = useModifier(char.wisdom,proficiencyModifier,0);
    const charismaModifier = useModifier(char.charisma,proficiencyModifier,0);

    // SKILLS MODIFIERS
    //  STRENGTH SKILLS
    const strengthSTModifier = useModifier(char.strength,proficiencyModifier,0);
    const athleticsModifier = useModifier(char.strength,proficiencyModifier,char.skills.Athletics);
    // DEXTERITY SKILLS



    return(
    <div className="attributesCard">
        {/* <!-- Left Card (Attributes)--> */}
        <div className="leftAttributesCard">

            <div className="profAttributes">
                <div className="profBlock bg-light">
                    <div className="circle">
                        {proficiencyModifier > 0 ? (
                           `+${proficiencyModifier}`
                        ) : proficiencyModifier
                        }</div>
                    <div className="prof-label">PROFICIENCY</div>
                </div>
                <div className="profBlock bg-light">
                    <div className="prof-label">
                        <div>PASSIVE</div>
                        <div>PERCEPTION</div>
                    </div>
                    <div className="circle">12</div>
                </div>
                <div className="profBlock bg-light">
                    <div className="circle">2</div>
                    <div className="prof-label">INSPIRATION</div>
                </div>
                <div className="profBlock bg-light">
                    <div className="prof-label">
                        <div>PASSIVE</div>
                        <div>INSIGHT</div>
                    </div>
                    <div className="circle">16</div>
                </div>
            </div>

            <div className="mainAttributesCard">

                {/* <!-- STRENGTH --> */}
                <div className="stat"> 
                    <div className="statValue bg-light">
                        <div className="attributeName">STRENGTH</div>
                        <div className="modifier">{strengthModifier}</div>
                        {isEditing ? (
                            <input
                                type="number"
                                min={1}
                                max={20}
                                className="abilityScore"
                                value={char.strength}
                                onChange={(e) => onStatChange('strength', parseInt(e.target.value))}
                                autoFocus
                            />
                            ) : (
                            <div className="abilityScore">{char.strength}</div>
                        )}
                    </div>
                    <div className="skillChecks">
                        <div className=""><input type="checkbox"></input> Saving Throws: {strengthSTModifier}</div>
                        <div className="">
                            <input type="checkbox" checked={char.skills.Athletics || false}
                                onChange={(e) => {
                                        onStatChange('skills', {
                                            ...char.skills,
                                            Athletics: e.target.checked,
                                        });
                                    }}
                                disabled={!isEditing}>
                            </input> 
                            Athletics: {athleticsModifier}</div>
                    </div>
                </div>

                {/* <!-- AGILITY --> */}
                <div className="stat">
                    <div className="statValue bg-light">
                        <div className="attributeName">DEXTERITY</div>
                        <div className="modifier">{dexterityModifier}</div>
                        <div className="abilityScore">{char.dexterity}</div>
                    </div>
                    <div className="skillChecks">
                        <div className=""><input type="checkbox" ></input> Saving Throws: +3</div>
                        <div className=""><input type="checkbox" ></input> Acrobatics: +3</div>
                        <div className=""><input type="checkbox" ></input> Sleight of Hand: +3</div>
                        <div className=""><input type="checkbox" ></input> Stealth: +3</div>
                    </div>
                </div>

                {/* <!-- CONSTITUTION --> */}
                <div className="stat">
                    <div className="statValue bg-light">
                        <div className="attributeName">CONSTITUTION</div>
                        <div className="modifier">{constitutionModifier}</div>
                        <div className="abilityScore">{char.constitution}</div>
                    </div>
                    <div className="skillChecks">
                        <div className=""><input type="checkbox" ></input> Saving Throws: +4</div>
                    </div>
                </div>

                {/* <!-- INTELLIGENCE --> */}
                <div className="stat">
                    <div className="statValue bg-light">
                        <div className="attributeName">INTELLIGENCE</div>
                        <div className="modifier">{intelligenceModifier}</div>
                        <div className="abilityScore">{char.intelligence}</div>
                    </div>
                    <div className="skillChecks">
                        <div className=""><input type="checkbox" ></input> Saving Throws: -1</div>
                        <div className=""><input type="checkbox" ></input> Arcana: -1</div>
                        <div className=""><input type="checkbox" ></input> History: -1</div>
                        <div className=""><input type="checkbox" ></input> Investigation: -1</div>
                        <div className=""><input type="checkbox" ></input> Nature: -1</div>
                        <div className=""><input type="checkbox" ></input> Religion: -1</div>
                    </div>
                </div>

                {/* <!-- WISDOM --> */}
                <div className="stat">
                    <div className="statValue bg-light">
                        <div className="attributeName">WISDOM</div>
                        <div className="modifier">{wisdomModifier}</div>
                        <div className="abilityScore">{char.wisdom}</div>
                    </div>
                    <div className="skillChecks">
                        <div className=""><input type="checkbox" ></input> Saving Throws: +5</div>
                        <div className=""><input type="checkbox" ></input> Animal Handling: +5</div>
                        <div className=""><input type="checkbox" ></input> Insight: +5</div>
                        <div className=""><input type="checkbox" ></input> Medicine: +5</div>
                        <div className=""><input type="checkbox" ></input> Perception: +5</div>
                        <div className=""><input type="checkbox" ></input> Survival: +5</div>
                    </div>
                </div>

                {/* <!-- CHARISMA --> */}
                <div className="stat">
                    <div className="statValue bg-light">
                        <div className="attributeName">CHARISMA</div>
                        <div className="modifier">{charismaModifier}</div>
                        <div className="abilityScore">{char.charisma}</div>
                    </div>
                    <div className="skillChecks">
                        <div className=""><input type="checkbox" ></input> Saving Throws: +5</div>
                        <div className=""><input type="checkbox" ></input> Deception: +5</div>
                        <div className=""><input type="checkbox" ></input> Intimidation: +5</div>
                        <div className=""><input type="checkbox" ></input> Performance: +5</div>
                        <div className=""><input type="checkbox" ></input> Persuation: +5</div>
                    </div>
                </div>     
            </div>

            <div className="traits"></div>

        </div>

        {/*Middle Card (HP, Weapons, Class Specifics)*/}
        <div className="middleAttributesCard">

            <div className="combatStats">
                <div className="row mb-4 firstRow">
                    <div className="col-4">
                        <div className="p-3 border bg-light shield">
                            <div className="shield-label">AC</div>
                            <div className="shield-value">14</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-3 border bg-light initiative">
                            <div className="initiative-label">Initiative</div>
                            <div className="initiative-value">+3</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-3 border bg-light speed">
                            <div className="initiative-label">Speed</div>
                            <div className="initiative-value">50ft</div>
                        </div>
                    </div>
                </div>

                <div className="row mb-4 secondRow">
                    <div className="col-8">
                        <div className="p-3 border bg-light HPCard divshadow">
                            <div className="bg-light maxHP">85</div>
                            <div className="bg-light maxHP-label">Hit Point Maximum</div>

                            <div className="currentHPSection">
                                <div className="currentHP-label">Current Hit Points</div>
                                <div className="currentHP">30</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="p-3 pt-0 border bg-light tempHPSection divshadow">
                            <div className="tempHP-label">Temporary <br></br> Hit Points</div>
                            <div className="tempHP">5</div>
                            
                        </div>
                    </div>
                </div>

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

            <div className="weaponsCard bg-light divshadow">
                <h4>WEAPONS</h4>
                <p>Name</p>
                <p>Atk Bonus</p>
                <p>Damage</p>
                <p>Type</p>

                <div>Crossbow</div>
                <div>+3</div>
                <div>1d6 +5</div>
                <div>Piercing</div>

                <div>Rapier</div>
                <div>+9</div>
                <div>1d8 +7</div>
                <div>Piercing</div>

                <div>Dagger</div>
                <div>+3</div>
                <div>1d4 +4</div>
                <div>Piercing</div>
            </div>

            <div className="charclassAbilities"></div>

        </div>


        <div className="rightAttributesCard" style={{border: '2px solid black'}}>
            <div className="charclassFeatures"></div>
        </div>
    </div>
    )
}

export default MainCard;