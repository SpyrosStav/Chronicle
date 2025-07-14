import React from 'react';

// -- BASIC INFO CARD (Name, Race, Class etc) --
function BasicInfoCard ({char}) { 
    return(
        <div className="basicInfoCard">
            <div className="charImageWrapper">
                <div className="charImage">
                    <img src={char.imageURL} alt="character-image"/>
                </div>
                <div className="levelBadge">{char.level}</div>
            </div>

            <div>
                <div className="charName">
                    <h1 className="inline text-center">{char.name} </h1> 
                    <p className="inline className">the <span>{char.charSubClass}</span> <span>{char.charClass}</span></p>
                </div>
                
                <div className="charInfo">
                    <div data-name="race">Race: {char.race}</div>
                    <div data-name="background">Background: {char.background}</div>
                    <div data-name="alignment">Alignment: {char.alignment}</div>
                </div>
            </div>
        </div>
    )  
}

export default BasicInfoCard;