import React, {useState} from 'react';

export default function WeaponBlock({weapon, setNewWeapons, onRemove}){
    
    const [newDamageInputValues, setNewDamageInputValues] = useState({});

    function handleNewWeaponChange(id, fieldName, value) {
        setNewWeapons(prevWeapons =>
            prevWeapons.map(w =>
                w.id === id
                ? { ...w, [fieldName]: value } : w
            )
        );
    }

    function handleCombinedDamageChange(value, weaponId) {
        const match = value.match(/^(\d+d\d+)\s*([+-]\d+)?$/);
        if (!match) return;

        const damage_die = match[1];
        const extra_damage = match[2] ? parseInt(match[2], 10) : 0;

        setNewWeapons(prevWeapons =>
            prevWeapons.map(w =>
                w.id === weaponId ? { ...w, damage_die, extra_damage } : w
            )
        );

        setNewDamageInputValues(prev => {
            const { [weaponId]: _, ...rest } = prev;
            return rest;
        });
    }

    return(
    <div className='row'>
        {/* Name */}
        <input className='col-3 text-center weapon-cell' type='text' 
            placeholder='Name' style={{border:"none", fontSize:"1.2em"}} 
            onChange={(e) => handleNewWeaponChange(weapon.id, 'name', e.target.value)}
        />

        {/* Attack Bonus */}
        <input className='col-2 text-center weapon-cell' type='text' 
            placeholder='Bonus' style={{border:"none", fontSize:"1.2em"}} 
            onChange={(e) => handleNewWeaponChange(weapon.id, 'atk_bonus', e.target.value)}
        />

        {/* Damage */}
        <input className='col-2 text-center weapon-cell' type='text' 
            placeholder='1d6 +3' style={{border:"none", fontSize:"1.2em"}} 
            onChange={(e) => { setNewDamageInputValues(prev => ({
                ...prev,
                [weapon.weapon_id]: e.target.value,
                }));
            }}
            onBlur={(e) => handleCombinedDamageChange(e.target.value, weapon.id)}
        />

        {/* Type */}
        <input className='col-3 text-center weapon-cell' type='text' 
            placeholder='Damage Type' style={{border:"none", fontSize:"1.2em"}} 
            onChange={(e) => handleNewWeaponChange(weapon.id, 'damage_type', e.target.value )}
        />

        {/* Delete Button */}
        <button className='weapon-delete-button' onClick={onRemove}></button>

    </div>
    )
}