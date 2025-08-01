import React, {useState, useRef} from 'react';
import { incrementValue, decrementValue} from '../../utils/inputHandler.js';

// -- BASIC INFO CARD (Name, Race, Class etc) --
export default function CharacterHeader({characterData, onStatChange, isEditing, imagePreviewUrl, onImageChange}) {

    const inputRefLevel = useRef(null);

    return(
    <div className="characterHeader">

        {/* Character Image Wrapper with Level */}
        <div className="charImageWrapper">

            {/* Image */}
            <div className="charImage">
                <img src={isEditing && imagePreviewUrl ? imagePreviewUrl : characterData.profile_image_path} alt="character-image"/>
                {isEditing && 
                    (<input  type="file" accept="image/*" className='mt-3'
                        style={{color:'transparent', position: 'absolute', bottom: '-35px', left: '0px'}}
                        onChange={onImageChange}
                    />)
                }
            </div>

            {/* Level */}
            {isEditing ? 
                (<>
                    <input type="number" ref={inputRefLevel} min={1} max={20}
                        value={characterData.level}
                        id='custom-number'className="levelBadge" 
                        onChange={(e) => onStatChange('level', parseInt(e.target.value))}
                    />
                    <div className="spinner-buttons level-spinner-buttons">
                        <button className='up' onClick={() => {incrementValue('level',inputRefLevel,onStatChange)}}></button>
                        <button className='down' onClick={() => {decrementValue('level',inputRefLevel,onStatChange)}}></button>
                    </div>
                </>) : 
                (<div className="levelBadge">{characterData.level}</div>)
            }
        </div>

        {/* Name and Basic Info Div */}
        <div>

            {/* Character Name and Class */}
            <div className="charName">
                <h1 className="inline text-center">{characterData.character_name} </h1>
                <p className="inline className">the <span>{characterData.subclass}</span> <span>{characterData.class}</span></p>
            </div>

            {/* Race and Background */}
            <div className="charInfo">
                <div data-name="race"><span className='label'>Race:</span> {characterData.race}</div>
                <div data-name="background"><span className='label'>Background:</span> {characterData.background}</div>
            </div>

        </div>

    </div>
    )  
}