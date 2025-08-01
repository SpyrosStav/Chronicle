import React, {useState, useRef} from 'react';
import AbilitySection from './AbiltitySection.jsx';
import CombatSection from './CombatSection.jsx';
import WeaponSection from './WeaponSection.jsx';
import ClassSection from './ClassSection.jsx';
import FeaturesSection from './FeaturesSection.jsx';

// --------------------------------------------------------------------- MAIN CARD ---------------------------------------------------------------------
export default function HeroDashboard({characterData, onStatChange, isEditing, handleWeaponDelete, newWeapons, setNewWeapons}){

    return(
    <div className="attributes">

        {/* LEFT CARD - PROFICIENCIES, ABILITY SCORES */}
        <div className="attribute-group-left">
            {/* COMPONENT --> ABILITY SCORES */}
            <AbilitySection characterData={characterData} onStatChange={onStatChange} isEditing={isEditing}></AbilitySection>
        </div>

        {/* MIDDLE CARD - (HP, WEAPONS, CLASS SPECIFICS) */}
        <div className="attribute-group-middle">
            {/* COMPONENT --> AC, INITIATIVE, SPEED - HP - HIT DIE, DEATH SAVES */}
            <CombatSection characterData={characterData} onStatChange={onStatChange} isEditing={isEditing}></CombatSection>

            {/* COMPONENT --> WEAPONS */}
            <WeaponSection characterData={characterData} isEditing={isEditing} onStatChange={onStatChange} 
            handleWeaponDelete={handleWeaponDelete} newWeapons={newWeapons} setNewWeapons={setNewWeapons}></WeaponSection>

            {/* COMPONENT --> SPECIFIC CLASS CARD (E.G. SPELLCASTING) */}
            <ClassSection></ClassSection>
        </div>

        {/* RIGHT CARD - FREE TEXT CARD FOR CLASS SKILLS */}
        <div className="attribute-group-right">
            {/* COMPONENT --> CHARACTER FEATURES */}
            <FeaturesSection></FeaturesSection>
        </div>

    </div>
    )
}