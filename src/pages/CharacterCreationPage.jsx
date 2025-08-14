import React, { useEffect, useState } from 'react';
import CharacterCreation from '../components/CharacterCreationPage/CharacterCreation';

export default function CharacterCreationPage({  }) {
    const [characterData,setCharacterData] = useState({
        character_name: "",
        level: 1,
        character_class: "", customCharacter_class:"",
        subclass: "", customSubclass: "",
        race: "", customRace: "",
        background: "",
        strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10,
        Strength_bonus: 0, Dexterity_bonus: 0, Constitution_bonus: 0, Intelligence_bonus: 0, Wisdom_bonus: 0, Charisma_bonus: 0, Other_bonus: 0,
        max_hp: 1,
        ac: 10,
        speed: 30
    });

    // Character Image states
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

    // Api for Character Data
    // const [classesInfo, setClassesInfo] = useState([])
    // useEffect(() => {
    //     fetch(`https://api.open5e.com/v1/classes/`)
    //     .then((response) => {
    //         if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {setClassesInfo(data.results)})
    //     .catch((err) => {
    //         if (err.name === 'AbortError') {
    //         return;
    //         }
    //     });
    // },[]);
    
    return(
    <>
        <h2>CHARACTER CREATION</h2>
        <CharacterCreation characterData={characterData} handleCharacterChange={handleCharacterChange} handleImageChange={handleImageChange} imagePreviewUrl={imagePreviewUrl}/>
    </>

    )

}