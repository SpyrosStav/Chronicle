import React, {useState, useRef} from 'react';
import { incrementValue, decrementValue} from '../../utils/inputHandler.js';

// -- BASIC INFO CARD (Name, Race, Class etc) --
function NameCard ({char, onStatChange, isEditing, imagePreviewUrl, onImageChange}) {

    const inputRefLevel = useRef(null);

    return(
        <div className="nameCard">
            <div className="charImageWrapper">
                <div className="charImage">
                    <img src={isEditing && imagePreviewUrl ? imagePreviewUrl : char.profile_image_path} alt="character-image"/>
                    {isEditing && (
                        <input
                            type="file" accept="image/*" className='mt-3'
                            style={{color:'transparent', position: 'absolute', bottom: '-35px', left: '0px'}}
                            onChange={onImageChange}/>
                    )}
                </div>
                {isEditing ? 
                    (<>
                        <input type="number" ref={inputRefLevel} value={char.level}
                            min={1} max={20} 
                            className="levelBadge" id='custom-number'
                            onChange={(e) => onStatChange('level', parseInt(e.target.value))}
                            autoFocus/>
                        <div className="spinner-buttons level-spinner-buttons">
                            <button className='up' onClick={() => {incrementValue('level',inputRefLevel,onStatChange)}}></button>
                            <button className='down' onClick={() => {decrementValue('level',inputRefLevel,onStatChange)}}></button>
                        </div>
                    </>) : 
                    (<div className="levelBadge">{char.level}</div>)
                }
            </div>

            <div>
                <div className="charName">
                    <h1 className="inline text-center">{char.character_name} </h1>
                    <p className="inline className">the <span>{char.subclass}</span> <span>{char.class}</span></p>
                </div>
                
                <div className="charInfo">
                    <div data-name="race"><span className='label'>Race:</span> {char.race}</div>
                    <div data-name="background"><span className='label'>Background:</span> {char.background}</div>

                </div>
            </div>
        </div>
    )  
}

export default NameCard;