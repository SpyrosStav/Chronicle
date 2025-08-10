import React, {useState} from 'react';

    const races = ["Dragonborn","Dwarf","Elf","Gnome","Half-Elf","Half-Orc","Halfling","Human","Tiefling"];
    const classes = ["Artificier", "Barbarian", "Bard", "Bloodhunter", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"];
    const subclasses = {
        "Artificier" : ["Alchemist", "Armorer", "Artillerist", "Battle Smith"],
        "Barbarian" : ["Ancestral Guardian","Battlerager", "Beast", "Berseker", "Giant", "Storm Herald", "Totem Warrior", "Wild Magic", "Zealot"],
        "Bard" : ["College of Creation","College of Eloquence","College of Glamour","College of Lore",
                    "College of Spirits","College of Swords","College of Valor","College of Whispers"],
        "Bloodhunter" : ["Ghostslayer", "Lycan", "Mutant", "Profane Soul"],
        "Cleric" : ["Arcana", "Death", "Forge", "Grave", "Knowledge", "Life", "Light", "Nature", "Order", "Peace", "Tempest", "Trickery", "Twilight", "War"],
        "Druid" : ["Circle of Dreams", "Circle of the Land", "Circle of the Moon", "Circle of the Shepard", "Circle of Spores", "Circle of Stars", "Circle of Wildfire"],
        "Fighter" : ["Arcane Archer", "Banneret", "Battle Master", "Cavalier", "Champion", "Echo Knight", "Eldritch Knight", "Psi Warrior", "Rune Warrior", "Samurai"],

    };

export default function CharacterCreation({characterData,handleCharacterChange, handleImageChange, imagePreviewUrl}){
    const [currentPage, setCurrentPage] = useState(1);
    
    
    return(
        <div>
            {/* Profile Image, Name */}
            <fieldset style={{margin:"20px auto"}} className='field-name'>

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
                <div className='form-group-name'>
                    <label htmlFor="characterName">Character Name</label>
                    <input 
                        type="text" id='characterName' value={characterData.character_name}
                        onChange={(e) => handleCharacterChange("name", e.target.value)}
                    />
                </div>
            </fieldset>

            <div className='menu'>
                <button onClick={() => setCurrentPage(1)} className = {currentPage === 1 ? 'selected' : ''}>Class</button>
                <button onClick={() => setCurrentPage(2)} className = {currentPage === 2 ? 'selected' : ''}>Basic Information</button>
                <button onClick={() => setCurrentPage(3)} className = {currentPage === 3 ? 'selected' : ''}>Ability Scores</button>
                <button onClick={() => setCurrentPage(4)} className = {currentPage === 4 ? 'selected' : ''}>Equipment</button>
                <button onClick={() => setCurrentPage(5)} className = {currentPage === 5 ? 'selected' : ''}>Summary</button>
            </div>

            <div className='characterForm'>
                {/* Class */}
                {currentPage === 1 && <ClassGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} />}
                

                {/* Ability Scores */}
                {currentPage === 3 && <AbiltyScoreGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} />}

                {/* Equipment */}
                {currentPage === 4 && <EquipmentGroup characterData = {characterData} handleCharacterChange={handleCharacterChange} />}

            </div>
        </div>
    )
}

// Name - Class - Race
function ClassGroup({characterData,handleCharacterChange}){
    const [currentClass, setCurrentClass] = useState(null);

    return(
        <fieldset style={{marginBottom:"20px"}}>
            

            {/* Class */}
            <div className='form-group'>
                <label htmlFor="characterClass" style={{textAlign:"center", fontSize:"1.3rem", marginBottom:"5px"}}>Select Class</label>
                <div className='classContainer'>
                    {classes.map(cls => (
                        <button key={cls} className={currentClass === cls ? 'classSelected' : ''}
                            onClick={() => 
                                {handleCharacterChange("character_class",cls);
                                handleCharacterChange("customCharacter_class","")
                                setCurrentClass(cls);}
                            }
                        >

                            <img src={'/static/images/characterCreation/'+cls+".png"}></img>

                            <span>{cls}</span>

                        </button>
                    ))}
                    <button onClick={() => 
                            {handleCharacterChange("character_class","Other");
                            setCurrentClass("Other");
                        }}
                        className={currentClass === "Other" ? 'classSelected' : ''}> 
                        <span style={{margin:"auto", fontSize:"1.5rem"}}>Other</span>
                    </button>
                </div>

                {characterData.character_class === "Other" && (
                    <input 
                        type="text" placeholder="Enter your class"
                        value={characterData.customCharacter_class || ""}
                        onChange={e => handleCharacterChange("customCharacter_class", e.target.value)}
                    />
                )}

            </div>

            {/* Subclass */}
            <div className='form-group'>
                <label htmlFor="characterSublass">Subclass</label>
                <select id='characterSubclass' value={characterData.subclass}
                    onChange={(e) => {
                        handleCharacterChange("subclass", e.target.value)
                        handleCharacterChange("customSubclass","")}}>

                    <option value="" disabled selected>Select Subclass</option>
                    {(subclasses[characterData.character_class] || []).map(subclass => (
                        <option key={subclass} value={subclass}>{subclass}</option>
                    ))}
                    <option value="Other"> Other </option>

                </select>

                {characterData.subclass === "Other" && (
                    <>
                        <br></br>
                        <input 
                            type="text" placeholder="Enter your subclass"
                            value={characterData.customSubclass || ""}
                            style={{marginTop:"10px"}}
                            onChange={e => handleCharacterChange("customSubclass", e.target.value)}
                        />
                    </>
                )}
            </div>

            

        </fieldset>
    )

}

function BasicInfoGroup({}){
    return(
        <fieldset>
            {/* Race */}
            <div className='form-group'>
                <label htmlFor='race'>Race</label>
                <select name='race' id='race' value={characterData.race}
                    onChange={(e) => { 
                            handleCharacterChange("race", e.target.value)
                            handleCharacterChange("customRace", "")
                        }
                    }
                >
                    <option value="" disabled selected>Select Race</option>
                    {races.map(race => (
                        <option key={race} value={race}>{race}</option>
                    ))}
                    <option value="Other">Other</option>
                </select>

                {characterData.race === "Other" && (
                    <>
                        <br></br>
                        <input 
                            type="text" placeholder="Enter your race"
                            value={characterData.customRace || ""}
                            style={{marginTop:"10px"}}
                            onChange={e => handleCharacterChange("customRace", e.target.value)}
                        />
                    </>
                )}
            </div>
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


