import React, {useRef} from 'react';
import {getAbilityModifier, getProficiencyModifier} from '../../utils/modifiers.js';
import {incrementValue, decrementValue} from '../../utils/inputHandler.js';

export default function CombatSection({characterData, onStatChange, isEditing}){

    const proficiencyModifier = getProficiencyModifier(characterData.level);
    const dexterityModifier = getAbilityModifier(characterData.dexterity,proficiencyModifier);

    const inputRefAC = useRef(null);
    const inputRefSpeed = useRef(null);
    const inputRefMHP = useRef(null);
    const inputRefCHP = useRef(null);
    const inputRefTHP = useRef(null);
    const inputRefHD = useRef(null);

    return(
    <div className="combatStats backgroundCard mb-3">
        <div className='text-center' style={{marginBottom:"5px", fontSize:"1.2rem", fontWeight:"600"}}>COMBAT STATS</div>

        {/* ROW --> AC, INITIATIVE, SPEED */}
        <div className="row mb-4 acInitiativeSpeedRow">

            {/* AC */}
            <div className="col-4">
                <div className="p-2 ac lightBackground">
                    <div className="ac-label">AC</div>
                    {isEditing ? 
                        (<div className='number-input-wrapper mb-0'>
                            <input type="number" min={0} ref={inputRefAC} 
                                value={characterData.ac}
                                id='custom-number' className="ac-value" style={{border:"none"}}
                                onChange={(e) => onStatChange('ac', parseInt(e.target.value))}
                            />
                            <div className="spinner-buttons">
                                <button className='up' onClick={() => {incrementValue('ac',inputRefAC,onStatChange)}}></button>
                                <button className='down' onClick={() => {decrementValue('ac',inputRefAC,onStatChange)}}></button>
                            </div>
                        </div>) : 
                        (<div className="ac-value">{characterData.ac}</div>)
                    }
                </div>
            </div>

            {/* INITIATIVE */}
            <div className="col-4">
                <div className="p-2 initiative lightBackground">
                    <div className="initiative-label">Initiative</div>
                    <div className="initiative-value">+{dexterityModifier}</div>
                </div>
            </div>

            {/* SPEED */}
            <div className="col-4">
                <div className="p-2 speed lightBackground">
                    <div className="speed-label">Speed</div>
                    {isEditing ? 
                        (<div className='number-input-wrapper mb-0'>
                            <input type="number" min={0} ref={inputRefSpeed} 
                                value={characterData.speed}
                                id='custom-number' className="speed-value" style={{border:"none"}}
                                onChange={(e) => onStatChange('speed', parseInt(e.target.value))}
                            />
                            <div className="spinner-buttons">
                                <button className='up' onClick={() => {incrementValue('speed',inputRefSpeed,onStatChange)}}></button>
                                <button className='down' onClick={() => {decrementValue('speed',inputRefSpeed,onStatChange)}}></button>
                            </div>
                        </div>) :
                        (<div className="speed-value">{characterData.speed}ft</div>)
                    }
                </div>
            </div>

        </div>

        {/* ROW --> MAX HP, CURRENT HP, TEMPORARY HP */}
        <div className="row mb-4 hpRow">

            {/* MAX HP */}
            <div className="col-4">
                <div className="p-2  HPCard lightBackground">
                    <div className='maxHPSection'>
                        <div className="maxHP-label text-center">Maximum HP</div>
                        {isEditing ? 
                            (<div className='number-input-wrapper mb-0'>
                                <input type="number" min={0} ref={inputRefMHP} 
                                    value={characterData.max_hp}
                                    id='custom-number' className="maxHP" style={{border:"none", width: "60px"}} 
                                    onChange={(e) => onStatChange('max_hp', parseInt(e.target.value))}
                                />
                                <div className="spinner-buttons">
                                    <button className='up' onClick={() => {incrementValue('max_hp',inputRefMHP,onStatChange)}}></button>
                                    <button className='down' onClick={() => {decrementValue('max_hp',inputRefMHP,onStatChange)}}></button>
                                </div>
                            </div>) :
                            (<div className="maxHP ">{characterData.max_hp}</div>) 
                        }  
                    </div>
                </div>
            </div>

            {/* CURRENT HP */}
            <div className='col-4'>
                <div className="currentHPSection lightBackground">
                    <div className="currentHP-label text-center">Current HP</div>
                    {isEditing ? 
                        (<div className='number-input-wrapper mb-0'>
                            <input type="number" min={0} max={characterData.max_hp} ref={inputRefCHP} 
                                value={characterData.c_hp}
                                id='custom-number' className="currentHP" style={{border:'none'}} 
                                onChange={(e) => onStatChange('c_hp', parseInt(e.target.value))}
                            />
                            <div className="spinner-buttons">
                                <button className='up' onClick={() => {incrementValue('c_hp',inputRefCHP,onStatChange)}}></button>
                                <button className='down' onClick={() => {decrementValue('c_hp',inputRefCHP,onStatChange)}}></button>
                            </div>
                        </div>):
                        (<div className="currentHP">{characterData.c_hp}</div>)
                    }
                </div>
            </div>

            {/* TEMPORARY HP */}
            <div className="col-4">
                <div className="p-2 tempHPSection lightBackground">
                    <div className="tempHP-label">Temporary HP</div>
                    {isEditing ? 
                        (<div className='number-input-wrapper mb-0'>
                            <input type="number" ref={inputRefTHP}
                                value={characterData.temp_hp}
                                id='custom-number' className="tempHP" style={{border:'none', width:"100%"}} 
                                onChange={(e) => onStatChange('temp_hp', parseInt(e.target.value))}
                            />
                            <div className="spinner-buttons">
                                <button className='up' onClick={() => {incrementValue('temp_hp',inputRefTHP,onStatChange)}}></button>
                                <button className='down' onClick={() => {decrementValue('temp_hp',inputRefTHP,onStatChange)}}></button>
                            </div>
                        </div>): 
                        (<div className="tempHP">{characterData.temp_hp}</div>)
                    }  
                </div>
            </div>

        </div>

        {/* ROW --> HIT DIE, DEATH SAVES */}
        <div className="row mb-4 hitDiceDSRow">

            {/* HIT DIE */}
            <div className="col-6">
                <div className='hitDice-label'>Hit Dice</div>
                <div className="p-2 hitDice lightBackground">
                    <div className='hitDiceContainer'>
                        {/* USED HD */}
                        <div>
                            <span>Used</span>
                            {isEditing ? 
                                (<div className=''>
                                    <input type="number" ref={inputRefHD} min={0} max={characterData.level} 
                                        value={characterData.hit_die}
                                        id='custom-number' className="text-center" style={{border:"none", fontWeight: "bold"}} 
                                        onChange={(e) => onStatChange('hit_die', parseInt(e.target.value))}
                                    />
                                    <div className="spinner-buttons spinner-buttons-hd">
                                        <button className='up' onClick={() => {incrementValue('hit_die',inputRefHD,onStatChange)}}></button>
                                        <button className='down' onClick={() => {decrementValue('hit_die',inputRefHD,onStatChange)}}></button>
                                    </div>
                                </div>):
                                (<div>{characterData.hit_die}</div>) 
                            }  
                        </div>

                        {/* TOTAL HD */}
                        <div>
                            <span>Total</span>
                            <div>{characterData.level}</div>
                        </div>
                    </div>

                    {/* HD INDICATOR --- TO CHANGE*/}
                    <div className='hitDie-indicator'>d10</div>
                </div>
            </div>

            {/* DEATH SAVES */}
            <div className="col-6">
                <div className='deathSaves-label'>Death Saves</div>
                <div className="p-2 deathSaves lightBackground">
                    <div className='deathSavesContainer'>

                        {/* SUCCESS */}
                        <div className="dsSuccess row">
                            <div className="text-end col-6" style={{display:'inline-block'}}>Successes</div>
                            <div className="death-saves-successes-checkbox col-6" style={{display:'inline-block'}}>
                                {[0, 1, 2].map((i) => (
                                    <input key={i} type="checkbox" style ={{marginLeft: "0.2em"}}
                                        checked={characterData.death_saves_success > i}
                                        disabled={!isEditing}                       
                                        onChange={(e) => {
                                            onStatChange('death_saves_success', characterData.death_saves_success + (e.target.checked ? 1 : -1));
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* FAIL */}
                        <div className="dsFail row">
                            <div className="text-end col-6" style={{display:'inline-block'}}>Failures</div>
                            <div className="death-saves-failures-checkbox col-6" style={{display:'inline-block'}}>
                                {[0, 1, 2].map((i) => (
                                    <input key={i} type="checkbox" style ={{marginLeft: "0.2em"}}
                                        checked={characterData.death_saves_fail > i}
                                        disabled={!isEditing}
                                        onChange={(e) => {
                                            onStatChange('death_saves_fail', characterData.death_saves_fail + (e.target.checked ? 1 : -1));
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
    )
}