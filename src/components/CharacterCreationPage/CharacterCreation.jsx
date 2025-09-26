import React, {useEffect, useState, useRef} from 'react';
import ProfileGroup from './ProfileGroup.jsx';
import ClassGroup from './ClassGroup.jsx';
import RaceGroup from './RaceGroup.jsx';
import BackgroundGroup from './BackgroundGroup.jsx';
import AbiltyScoreGroup from './AbilityScoreGroup.jsx';
import EquipmentGroup from './EquipmentGroup.jsx'

export default function CharacterCreation({characterData,handleCharacterChange, handleImageChange, imagePreviewUrl, method, setMethod, availablePoints, setPoints}){
    const [currentPage, setCurrentPage] = useState(1);
    
    return(
        <div>

            <ProfileGroup characterData={characterData} handleCharacterChange={handleCharacterChange} 
                handleImageChange={handleImageChange} imagePreviewUrl={imagePreviewUrl}/>

            {/* Menu */}
            <div className='menu'>
                <button onClick={() => setCurrentPage(1)} className = {currentPage === 1 ? 'selected' : ''}>1.Class</button>
                <button onClick={() => setCurrentPage(2)} className = {currentPage === 2 ? 'selected' : ''}>2.Race</button>
                <button onClick={() => setCurrentPage(3)} className = {currentPage === 3 ? 'selected' : ''}>3.Background</button>
                <button onClick={() => setCurrentPage(4)} className = {currentPage === 4 ? 'selected' : ''}>4.Ability Scores</button>
                <button onClick={() => setCurrentPage(5)} className = {currentPage === 5 ? 'selected' : ''}>5.Equipment</button>
                <button onClick={() => setCurrentPage(6)} className = {currentPage === 6 ? 'selected' : ''}>6.Summary</button>
            </div>

            {/* Main Panel */}
            <div className='characterForm'>
                {/* 1.Class */}
                {currentPage === 1 && <ClassGroup characterData = {characterData} handleCharacterChange={handleCharacterChange}/>}
                {/* 2.Race */}
                {currentPage === 2 && <RaceGroup characterData = {characterData} handleCharacterChange={handleCharacterChange}/>}
                {/* 3.Background */}
                {currentPage === 3 && <BackgroundGroup characterData = {characterData} handleCharacterChange={handleCharacterChange}/>}
                {/* 4.Ability Scores */}
                {currentPage === 4 && <AbiltyScoreGroup characterData = {characterData} handleCharacterChange={handleCharacterChange}
                    method = {method} setMethod = {setMethod} availablePoints = {availablePoints} setPoints={setPoints}/>}
                {/* 5.Equipment */}
                {currentPage === 5 && <EquipmentGroup characterData = {characterData} handleCharacterChange={handleCharacterChange}/>}
            </div>

        </div>
    )
}

