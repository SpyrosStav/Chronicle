import React, {useEffect, useState, useRef} from 'react';
import {RACES} from './classesInfo.jsx';
import RACE_INFO from '../../data/races.json';

export default function RaceGroup({characterData,handleCharacterChange}){
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
                            <img src={'/static/images/characterCreation/'+race+".png"}></img>
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