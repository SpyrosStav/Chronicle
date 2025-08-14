import React, {useEffect, useState, useRef} from 'react';
import {RACES, CLASSES, SUBCLASSES, CLASS_DESCRIPTION} from './classesInfo.jsx';
import BACKGROUNDS from '../../data/backgrounds.json';
import RACE_INFO from '../../data/races.json';
import { incrementValue, decrementValue} from '../../utils/inputHandler.js';

export default function CharacterCreation({characterData,handleCharacterChange, handleImageChange, imagePreviewUrl}){
    const [currentPage, setCurrentPage] = useState(1);
    const [asBonuses, setASBonuses] = useState([]);
    const inputRefLevel = useRef(null);
    
    return(
        <div>
            {/* Profile Image, Name */}
            <fieldset style={{margin:"0px auto 5px"}} className='field-name'>

                {/* Image */}
                <input  type="file" accept="image/*" style={{ display: "none" }} id="characterImage" 
                onChange={handleImageChange}/>

                <label className="imageLabel" htmlFor="characterImage">
                    {imagePreviewUrl ? (
                        <img src={imagePreviewUrl} alt="Preview" 
                            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition:"top center" }}
                        />
                    ) : (
                        "+"
                    )}
                </label>

                {/* Name */}
                <div className='form-group-name' style={{margin:"auto 0"}}>
                    <label htmlFor="characterName">Character Name</label>
                    <input 
                        type="text" id='characterName' value={characterData.character_name}
                        onChange={(e) => handleCharacterChange("name", e.target.value)}
                    />
                </div>

                {/* Level */}
                <div className='form-group-level' style={{margin:"auto 0"}}>
                    <label htmlFor="characterLevel">Level</label>
                    <input type="number" ref={inputRefLevel} min={1} max={20}
                        value={characterData.level}
                        id='custom-number' className="levelBadge text-center" 
                        onChange={(e) => handleCharacterChange('level', parseInt(e.target.value))}
                    />
                    <div className="spinner-buttons" style={{top:"15px"}}>
                        <button className='up' onClick={() => {incrementValue('level',inputRefLevel,handleCharacterChange)}}></button>
                        <button className='down' onClick={() => {decrementValue('level',inputRefLevel,handleCharacterChange)}}></button>
                    </div>
                </div>

            </fieldset>

            <div className='menu'>
                <button onClick={() => setCurrentPage(1)} className = {currentPage === 1 ? 'selected' : ''}>1.Class</button>
                <button onClick={() => setCurrentPage(2)} className = {currentPage === 2 ? 'selected' : ''}>2.Race</button>
                <button onClick={() => setCurrentPage(3)} className = {currentPage === 3 ? 'selected' : ''}>3.Background</button>
                <button onClick={() => setCurrentPage(4)} className = {currentPage === 4 ? 'selected' : ''}>4.Ability Scores</button>
                <button onClick={() => setCurrentPage(5)} className = {currentPage === 5 ? 'selected' : ''}>5.Equipment</button>
                <button onClick={() => setCurrentPage(6)} className = {currentPage === 6 ? 'selected' : ''}>6.Summary</button>
            </div>

            <div className='characterForm'>
                {/* Class */}
                {currentPage === 1 && <ClassGroup characterData = {characterData} handleCharacterChange={handleCharacterChange}/>}

                {/* Race */}
                {currentPage === 2 && <RaceGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} setASBonuses={setASBonuses}/>}

                {/* Background */}
                {currentPage === 3 && <BackgroundGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} setASBonuses={setASBonuses}/>}
                
                {/* Ability Scores */}
                {currentPage === 4 && <AbiltyScoreGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} />}

                {/* Equipment */}
                {currentPage === 5 && <EquipmentGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} />}

            </div>
        </div>
    )
}

// Class - Subclass
function ClassGroup({characterData,handleCharacterChange}){
    const currentClass = characterData.character_class;
    const currentSubclass = characterData.subclass;

    return(
        <fieldset className='classPanel' style={{marginBottom:"20px", position:"relative"}}>

            {characterData.character_class ? 
                (<div className='form-group form-group-description' style={{padding:"5px 1rem",whiteSpace: "pre-line"}}>
                    <p style={{textAlign:"center", fontSize:"1.5rem", margin:"0"}}>{characterData.character_class}</p>
                    {CLASS_DESCRIPTION[characterData.character_class]}
                </div>) : (null)
            }

            {/* Class */}
            <div className='form-group form-group-class'>
                <label htmlFor="characterClass" style={{textAlign:"center", fontSize:"1.3rem", marginBottom:"5px"}}>Select Class</label>
                <div className='classContainer'>
                    {CLASSES.map(cls => (
                        <button key={cls} className={currentClass === cls ? 'classSelected' : ''}
                            onClick={() => 
                                {
                                    handleCharacterChange("character_class",cls);
                                    handleCharacterChange("customCharacter_class","")
                                }
                            }>
                            <img src={'/static/images/characterCreation/'+cls+".png"}></img>
                            <span>{cls}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Subclass */}
            {characterData.character_class ? (
                <div className='form-group form-group-subclass'>
                    <label htmlFor="characterSublass" style={{textAlign:"center", fontSize:"1.3rem", marginBottom:"5px"}}>Select Subclass</label>

                    <div className='subclassContainer'>
                        {(SUBCLASSES[characterData.character_class] || []).map(subclass => (
                            <button key={subclass} className={currentSubclass === subclass ? 'classSelected' : ''}
                                onClick={() => 
                                    {
                                        handleCharacterChange("subclass",subclass);
                                        handleCharacterChange("customSubclass","")
                                    }
                                }
                            >
                                <span>{subclass}</span>
                            </button>
                        ))}
                    </div>

                </div>
            ):(null)}
            
        </fieldset>
    )

}

function RaceGroup({characterData,handleCharacterChange,setASBonuses}){
    const currentRace = characterData.race;
    const raceObject = RACE_INFO.results.find(race => race.name === characterData.race);
    const bonuses = ["Strength_bonus","Dexterity_bonus","Constitution_bonus","Intelligence_bonus","Wisdom_bonus","Charisma_bonus","Other_bonus"];

    useEffect(() => {
        if(raceObject){
            
            bonuses.map((bonus)=> (
                handleCharacterChange(bonus,0)
            ));
            raceObject.asi.map((as) => {
                                    handleCharacterChange(as.attributes[0]+"_bonus",as.value);
                                    // console.log("updated", as.attributes[0]+"_bonus value ", as.value)
                            });
            handleCharacterChange("speed", raceObject.speed.walk);
        }
    },[raceObject])

    return(
        <fieldset className='basicInfoPanel' style={{marginBottom:"20px", position:"relative"}}>

            {/* Race */}
            <div className='form-group form-group-race'>
                <label htmlFor='race' style={{textAlign:"center", marginBottom:'5px',fontSize:"1.3rem"}}>Select Race</label>
                <div className='raceContainer'>
                    {RACES.map(race => (
                        <button key={race} className={currentRace === race ? 'classSelected' : ''}
                            onClick={() => 
                            {
                                handleCharacterChange("race", race);
                                handleCharacterChange("customRace", "");
                            }
                        }>
                            <span>{race}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Races Description */}
            {characterData.race ? (
                <div className='form-group form-group-raceDesc'>
                    <label style={{textAlign:"center",fontSize:"1.5rem"}}>{characterData.race}</label>
                    <div className='raceDescContainer'>
                        <div key={raceObject.slug} className='raceFeatures'>
                            {/* Description */}
                            <div className='raceDesc'>{raceObject.desc.replace(/^## .* Traits\s*/, '')}</div>
                            {/* AS Increase */}
                            <div className='traitsLabels'>Abilty Score Increase</div>
                            <div className='raceAS'>{raceObject.asi_desc.replace(/^\*\*\_Ability Score Increase\.\_\*\*/, '')}</div>
                            {/* Languages, Size, Speed */}
                            <div className='traitsLabels'>Age</div>
                            <div>{raceObject.age.replace(/\*\*.*\*\*/, '')}</div>
                            <div className='traitsLabels'>Size</div>
                            <div>{raceObject.size.replace(/\*\*.*\*\*/, '')}</div>
                            <div className='traitsLabels'>Languages</div>
                            <div>{raceObject.languages.replace(/\*\*.*\*\*/, '')}</div>
                            <div className='traitsLabels'>Speed</div>
                            <div>{raceObject.speed_desc.replace(/\*\*.*\*\*/, '')}</div>

                            {raceObject.vision.length > 0 ? (
                                <>
                                    <div className='traitsLabels'>Vision</div>
                                    <div>{raceObject.vision.replace(/\*\*.*\*\*/, '')}</div>
                                </>
                            ):(null)}

                            {raceObject.traits.length > 0 ? (
                                <>
                                    <div className='traitsLabels'>Traits</div>
                                    <div style={{whiteSpace: "pre-wrap"}}>
                                        {raceObject.traits.replace(/\*\*_/g,'')
                                        .replace(/\._\*\*/g,':')
                                        .replace(/\*\*.*\*\*/g,"")
                                        .replace(/\n\n/g,"\n")}
                                    </div>
                                </>
                            ):(null)}
                        </div>
                    </div>
                </div>) :(null)
            }
        </fieldset>
    )
}

function BackgroundGroup({characterData,handleCharacterChange,setASBonuses}){
    const currentBackground = characterData.background;

    return(
        <fieldset className='basicInfoPanel' style={{marginBottom:"20px", position:"relative"}}>

            {/* Backgrounds */}
            <div className='form-group form-group-background'>
                <label htmlFor='background' style={{textAlign:"center", marginBottom:'5px',fontSize:"1.3rem"}}>Select Background</label>
                <div className='backgroundContainer'>
                    {BACKGROUNDS.results.map(background => (
                        <button key={background.name} className={currentBackground === background.name ? 'classSelected' : ''}
                            onClick={() => 
                                {
                                    handleCharacterChange("background",background.name);
                                    // handleCharacterChange("customRace","");
                                }
                        }>
                            <span>{background.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Backgrounds Description */}
            {characterData.background ? (
                <div className='form-group form-group-background'>
                    <label htmlFor='background' style={{textAlign:"center",fontSize:"1.5rem"}}>{characterData.background}</label>
                    <div className=''>
                        {BACKGROUNDS.results.find(bg => bg.name === characterData.background).benefits.map(benefit => (
                            (benefit.type === "connection_and_memento" || benefit.type === "suggested_characteristics") ? (null):(
                            <div key={benefit.name} className='backgroundFeatures'>
                                <div className='traitsLabels'>{benefit.name}</div>
                                <div className='backgroundDesc'>{benefit.desc}</div>
                            </div>
                        )))}
                    </div>
                </div>) :(null)
            }

        </fieldset>
    )

}

// Abilty Scores
function AbiltyScoreGroup({characterData,handleCharacterChange}){
    return(
        <fieldset>
            
        </fieldset>
    )
}

// Equipment
function EquipmentGroup({characterData,handleCharacterChange}){
    return(
        <fieldset>

        </fieldset>
    )
}


