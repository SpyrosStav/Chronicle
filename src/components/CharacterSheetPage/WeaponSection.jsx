import React, {useState} from 'react';
import WeaponBlock from './WeaponBlock';

export default function WeaponSection({characterData, isEditing, onStatChange, handleWeaponDelete, newWeapons, setNewWeapons}){

    const [damageInputValues, setDamageInputValues] = useState({});
    
    // WEAPON CHANGE
    function handleWeaponChange(weaponId, field, value) {
        const updatedWeapons = characterData.weapons.map((weapon) =>
            weapon.weapon_id === weaponId
            ? { ...weapon, [field]: value }
            : weapon
        );

        onStatChange('weapons', updatedWeapons);
    }

    function handleCombinedDamageChange(value, weaponId) {
        const match = value.trim().match(/^(\d+d\d+)\s*([+-]\d+)?$/);

        if (!match) return; // optionally handle bad input

        const damage_die = match[1];
        const extra_damage = match[2] ? parseInt(match[2], 10) : 0;

        const updatedWeapons = characterData.weapons.map((weapon) =>
            weapon.weapon_id === weaponId
            ? { ...weapon, damage_die, extra_damage }
            : weapon
        );

        onStatChange('weapons', updatedWeapons);

        setDamageInputValues(prev => {
            const { [weaponId]: _, ...rest } = prev;
            return rest;
        });
    }

    // NEW WEAPON INPUT
    function newWeaponInput() {
        setNewWeapons((prev) => [...prev, {id: Date.now(), name: '', 
            atk_bonus: null, damage_die: '', extra_damage: null,
            damage_type: null}]); 
    }

    function removeNewWeapon(idToRemove) {
        setNewWeapons((prev) => prev.filter((weapon) => weapon.id !== idToRemove));
    }

    return(
    <div className="weaponsCard backgroundCard ">

        <div className='weapons-label'>WEAPONS</div>     
        <div className='row align-items-end'>
            {isEditing ? 
                (<>
                    <p className='col-3'>Name</p> 
                    <p className='col-2'>Atk Bonus</p>
                    <p className='col-2'>Damage</p> 
                    <p className='col-3'>Type</p>
                    <p className='col-2'>Delete</p>
                </>) :
                (<>
                    <p className='col-4'>Name</p> 
                    <p className='col-2'>Atk Bonus</p>
                    <p className='col-3'>Damage</p> 
                    <p className='col-3'>Type</p>
                </>)
            }
        </div>

        {characterData.weapons.map((weapon) => (
            <div key={weapon.weapon_id} className='row'>
                {isEditing ? 
                    (<React.Fragment>

                        {/* Name */}
                        <input className='col-3 text-center weapon-cell' type='text' style={{border:"none"}} 
                            value={weapon.name} 
                            onChange={(e) => handleWeaponChange(weapon.weapon_id,'name', e.target.value)}
                        />

                        {/* Attack Bonus */}
                        <input className='col-2 text-center weapon-cell' type='text' style={{border:"none"}} 
                            value={weapon.atk_bonus}
                            onChange={(e) => handleWeaponChange(weapon.weapon_id,'atk_bonus', e.target.value)}
                        />

                        {/* Damage */}
                        <input className='col-2 text-center weapon-cell' type='text' style={{border:"none"}} 
                            value={damageInputValues[weapon.weapon_id] ??
                            `${weapon.damage_die}${weapon.extra_damage > 0 ? `+${weapon.extra_damage}` : ''}`}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                setDamageInputValues(prev => ({...prev,[weapon.weapon_id]: newValue,}));
                            }}
                            onBlur={() => handleCombinedDamageChange(damageInputValues[weapon.weapon_id], weapon.weapon_id)}
                        />
                        {/* Damage Type */}
                        <input className='col-3 text-center weapon-cell' type='text' style={{border:"none"}} 
                            value={weapon.damage_type} 
                            onChange={(e) => handleWeaponChange(weapon.damage_type,'damage_type', e.target.value)}
                        />

                        <button className='weapon-delete-button col-2 text-center' 
                            onClick={() => {handleWeaponDelete(weapon.weapon_id)}}>
                        </button>

                    </React.Fragment>) : 
                    (<React.Fragment>
                        {/* Name */}
                        <div className='col-4 text-center weapon-cell'>{weapon.name}</div>

                        {/* Attack Bonus */}
                        <div className='col-2 text-center weapon-cell'>{weapon.atk_bonus > 0 ? (`+${weapon.atk_bonus}`) : weapon.atk_bonus}</div>

                        {/* Damage */}
                        <div className='col-3 text-center weapon-cell'>
                            {weapon.damage_die} {weapon.extra_damage > 0 ? (`+${weapon.extra_damage}`) : weapon.extra_damage}
                        </div>

                        {/* Damage Type */}
                        <div className='col-3 text-center weapon-cell'>{weapon.damage_type}</div>
                    </React.Fragment>)
                }
            </div>
        ))}

        {isEditing && newWeapons.map((weapon) => (
            <WeaponBlock key={`new-${weapon.id}`} setNewWeapons={setNewWeapons} 
            weapon={weapon} onRemove={() => removeNewWeapon(weapon.id)}/>
        ))}

        {isEditing ? 
            (<button className='add-weapon-btn col-12' onClick={newWeaponInput}>
                ADD WEAPON <span style={{fontSize:"1.3rem", fontWeight:"bold"}}>+</span>
            </button>) :  (null)
        }

    </div>
    )
}