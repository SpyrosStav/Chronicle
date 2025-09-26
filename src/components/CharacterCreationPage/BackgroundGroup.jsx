import React, {useEffect, useState, useRef} from 'react';
import BACKGROUNDS from '../../data/backgrounds.json';

export default function BackgroundGroup({characterData,handleCharacterChange}){
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