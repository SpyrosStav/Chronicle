import React, {useState} from 'react';

// -- BASIC INFO CARD (Name, Race, Class etc) --
function BasicInfoCard ({char, onStatChange, isEditing, imagePreviewUrl, onImageChange}) {

    return(
        <div className="basicInfoCard">
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
                    (<input type="number" min={1} max={20} className="levelBadge" value={char.level}
                        onChange={(e) => onStatChange('level', parseInt(e.target.value))}
                        autoFocus/>) : 
                    (<div className="levelBadge">{char.level}</div>)
                }
            </div>

            <div>
                <div className="charName">
                    <h1 className="inline text-center">{char.character_name} </h1>
                    <p className="inline className">the <span>{char.subclass}</span> <span>{char.class}</span></p>
                </div>
                
                <div className="charInfo">
                    <div data-name="race">Race: {char.race}</div>
                    <div data-name="background">Background: {char.background}</div>

                </div>
            </div>
        </div>
    )  
}

export default BasicInfoCard;