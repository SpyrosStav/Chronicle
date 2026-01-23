import React, { useEffect, useState } from 'react';
import CharacterCreation from '../components/CharacterCreationPage/CharacterCreation';

export default function CharacterCreationPage({  }) {
    // Character State
    const [characterData,setCharacterData] = useState({
        character_name: "", level: 1,
        character_class: "", customCharacter_class:"",
        subclass: "", customSubclass: "",
        race: "", customRace: "", background: "",
        strength: 8, dexterity: 8, constitution: 8, intelligence: 8, wisdom: 8, charisma: 8,
        Strength_bonus: 0, Dexterity_bonus: 0, Constitution_bonus: 0, Intelligence_bonus: 0, Wisdom_bonus: 0, Charisma_bonus: 0, Other_bonus: 0,
        Strength_override: 0, Dexterity_override: 0, Constitution_override: 0, Intelligence_override: 0, Wisdom_override: 0, Charisma_override: 0,
        max_hp: 1, ac: 10, speed: 30
    });

    const totals = {
        strength: characterData.strength + characterData.Strength_bonus + characterData.Strength_override,
        dexterity: characterData.dexterity + characterData.Dexterity_bonus + characterData.Dexterity_override,
        constitution: characterData.constitution + characterData.Constitution_bonus + characterData.Constitution_override,
        intelligence: characterData.intelligence + characterData.Intelligence_bonus + characterData.Intelligence_override,
        wisdom: characterData.wisdom + characterData.Wisdom_bonus + characterData.Wisdom_override,
        charisma: characterData.charisma + characterData.Charisma_bonus + characterData.Charisma_override,
    };

    const [method, setMethod] = useState("pb");
    const [availablePoints,setPoints] = useState(27);


    // Character Image States
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

    const bgWrapper = document.getElementById("content-wrap");
    bgWrapper.classList.remove("bg-loading");
    bgWrapper.classList.add("bg-loaded");

    function handleCharacterChange(field,value){
        setCharacterData(prev => ({
            ...prev, [field]:value
        }))
    }

    // Handle the Image Change
    const handleImageChange = (e) => { 
        const file = e.target.files[0];
        if (!file) return;

        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => { setImagePreviewUrl(reader.result); };
        reader.readAsDataURL(file);
    };
    
    return(
        <>
            <h2>CHARACTER CREATION</h2>
            <CharacterCreation characterData={characterData} handleCharacterChange={handleCharacterChange} 
                handleImageChange={handleImageChange} imagePreviewUrl={imagePreviewUrl}
                method={method} setMethod={setMethod}
                availablePoints = {availablePoints} setPoints={setPoints}/>
        </>
    )

}