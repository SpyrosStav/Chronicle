import React, {useEffect, useState, useRef} from 'react';
import {incrementValue, decrementValue} from '../../utils/inputHandler.js';

export default function ProfileGroup({characterData,handleCharacterChange, handleImageChange, imagePreviewUrl}){
    const inputRefLevel = useRef(null);
    return(
        <fieldset style={{margin:"0px auto 5px"}} className='field-name'>

            {/* Image */}
            <input  type="file" accept="image/*" style={{ display: "none" }} id="characterImage" 
                onChange={handleImageChange}/>

            <label className="imageLabel" htmlFor="characterImage">
                {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Preview" 
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition:"top center" }}
                    />) : ("+")
                }
            </label>

            {/* Name */}
            <div className='form-group-name' style={{margin:"auto 0"}}>
                <label htmlFor="characterName">Character Name</label>
                <input 
                    type="text" id='characterName' value={characterData.character_name}
                    onChange={(e) => handleCharacterChange("character_name", e.target.value)}
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
    )
}