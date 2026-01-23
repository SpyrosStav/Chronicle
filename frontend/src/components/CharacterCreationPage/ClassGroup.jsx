import React, {useEffect, useState, useRef} from 'react';
import {RACES, CLASSES, SUBCLASSES, CLASS_DESCRIPTION} from './classesInfo.jsx';

export default function ClassGroup({characterData,handleCharacterChange}){
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