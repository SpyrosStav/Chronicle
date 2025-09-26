import React, {useEffect, useState, useRef, useMemo} from 'react';
import {getAbilityModifier} from '../../utils/modifiers.js';
import { decrementValue, incrementValue } from '../../utils/inputHandler.js';

export default function AbiltyScoreGroup({characterData,handleCharacterChange, method, setMethod, availablePoints, setPoints}){
    
    const abilityScores = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];
    const [prevAbility1, setPrevAbility1] = useState(null);
    const [prevAbility2, setPrevAbility2] = useState(null);

    const [firstLoad,setFirstLoad] = useState(false);

    // Reset stats on method change
    useEffect(() => {
        if(firstLoad){
            abilityScores.forEach(abilityScore => {
                const asOverride = abilityScore + "_override";
                handleCharacterChange(abilityScore.toLowerCase(),8);
                handleCharacterChange(asOverride,0);
            });
            setPoints(27);
        }
        else{
            setFirstLoad(true);
        }
    }, [method]);

    return(
        <fieldset className='asGroup'>

            {/* Calculation Method */}
            <div className='' style={{marginBottom:"20px", position:"relative", width:"15%"}}>
                <div className='form-group form-group-as'>
                    <legend>Calculation Method</legend>
                    <div>
                        <input type="radio" id='asRadioPB' name="asRadio" value="pb" checked={method === "pb"}
                        onChange={() => setMethod("pb")} style={{display:"inline-block", margin:"0 5px"}}/>
                        <label htmlFor="asRadioPB" style={{display:"inline-block"}}>Point Buy</label>
                    </div>
                    <div>
                        <input type="radio" id='asRadioSA' name="asRadio" value="sa" checked={method === "sa"}
                        onChange={() => setMethod("sa")} style={{display:"inline-block", margin:"0 5px"}}/>
                        <label htmlFor="asRadioSA" style={{display:"inline-block"}}>Standard Array</label>
                    </div>
                    <div>
                        <input type="radio" id='asRadioRG' name="asRadio" value="rg" checked={method === "rg"}
                        onChange={() => setMethod("rg")} style={{display:"inline-block", margin:"0 5px"}}/>
                        <label htmlFor="asRadioRG" style={{display:"inline-block"}}>Random Generation</label>
                    </div>
                </div>
            </div>


            {/* Ability Score Caluclation */}
            <div style={{marginBottom:"20px", position:"relative", width:"70%"}}>
                <div className='form-group form-group-as'>
                    <label htmlFor='as' style={{textAlign:"center", marginBottom:'5px',fontSize:"1.5rem", fontWeight:"bold"}}>Ability Scores</label>
                    {/* Point Buy */}

                    <table className='asGrid'>

                        <thead>
                            <tr>
                                <th style={{width:"12%"}}>Attribute</th>
                                <th style={{width:"12%"}}>Ability Score</th>
                                <th style={{width:"7%"}}>+</th>
                                <th style={{width:"10%"}}>Racial Bonus</th>
                                <th style={{width:"7%"}}>+</th>
                                <th style={{width:"12%"}}>Other Modifier</th>
                                <th style={{width:"7%"}}>=</th>
                                <th style={{width:"12%"}}>Total</th>
                                <th style={{width:"15%"}}>Ability Modifier</th>
                            </tr>
                        </thead>
                        
                        <tbody>

                            {abilityScores.map(abilityScore => <AbilityScoreRow key={abilityScore} characterData={characterData} name={abilityScore} calculation = {method}
                                handleCharacterChange={handleCharacterChange} availablePoints={availablePoints} setPoints={setPoints}></AbilityScoreRow>)}


                            <tr>
                                {/* Racial Option 1 */}
                                <td>
                                    {characterData.Other_bonus > 0 && (
                                    <>
                                        <select name="option" id="otherBonusSelect1" value={prevAbility1 || ""}
                                            onChange={(e) => { SetBonusAttribute(e.target.value, prevAbility1, setPrevAbility1, handleCharacterChange)}}>
                                            <option value="">Choose Attribute</option>
                                            {abilityScores.map( (score) => {
                                                score = String(score).charAt(0).toUpperCase() + String(score).slice(1);
                                                if(characterData[score+"_bonus"] === 0 || prevAbility1 === score){
                                                    return <option key={score} value={score}>{score}</option>;
                                                }
                                                return null;
                                            })}
                                        </select>
                                    </>
                                    )}
                                </td>
                                {/* Racial Option 2 */}
                                <td>
                                    {characterData.Other_bonus > 1 && (
                                    <>
                                        <select name="option" id="otherBonusSelect2" value={prevAbility2 || ""}
                                            onChange={(e) => { SetBonusAttribute(e.target.value, prevAbility2, setPrevAbility2, handleCharacterChange)}}>
                                            <option value="">Choose Attribute</option>
                                            {abilityScores.map( (score) => {
                                                score = String(score).charAt(0).toUpperCase() + String(score).slice(1);
                                                if(characterData[score+"_bonus"] === 0 || prevAbility2 === score){
                                                    return <option key={score} value={score}>{score}</option>;
                                                }
                                            })}
                                        </select>
                                    </>
                                    )}
                                </td>
                                {/* Point Buy - Available Points */}
                                {method === "pb" && (
                                    <>
                                        <td></td><td></td><td></td><td></td><td></td>
                                        <td>Available Points:</td><td>{availablePoints}</td>
                                    </>
                                )}
                            </tr>

                        </tbody>

                    </table>

                    {/* Standard Array */}
                    {method === "sa" && (
                        <div>

                        </div>
                    )}

                    {/* Random Generation */}
                    {method == "rg" && (
                        <div>

                        </div>
                    )}
                    
                </div>
                
            </div>

            {/* Background Bonus */}
            

        </fieldset>
    )
}

function AbilityScoreRow({characterData, name, calculation, handleCharacterChange, availablePoints, setPoints}){
    const as = name.toLowerCase();
    const asBonus = name + "_bonus";
    const asOverride = name + "_override";
    const totalAS = characterData[as] + characterData[asBonus] + characterData[asOverride]; 

    const inputRefAS = useRef(null);
    const inputRefOverride = useRef(null);

    const standardArray = [15,14,13,12,10,8];
    const [usedArray, setUsedArray] = useState([]);

    return(
        <tr className='asRow'>

            {/* Name */}
            <td style={{width:"12%"}}>{name}</td>
            {/* Ability Score */}
            {calculation === "pb" && (
                <td style={{width:"12%"}}>
                    <input type="number" ref={inputRefAS} min={8} max={15} value={characterData[as]} id='custom-number'
                    onChange={(e) => {handleCharacterChange(as, parseInt(e.target.value));
                    }}/>
                    <div className="spinner-buttons" style={{right:"20%"}}>
                        <button className='up' onClick={() => {AddPoint(characterData,as,inputRefAS,handleCharacterChange,availablePoints,setPoints)}}></button>
                        <button className='down' onClick={() => {RemovePoint(characterData,as,inputRefAS,handleCharacterChange,availablePoints,setPoints)}}></button>
                    </div>
                </td>
            )}

            {calculation === "sa" && (
                <td style={{width:"12%"}}>
                    {/* <select name="standardArray" id="standardArray" value={characterData[as]}
                        onChange={(e) => { 
                            const value = parseInt(e.target.value); 
                            setUsedArray((prev) => [...prev, value]);
                            handleCharacterChange(as,parseInt(e.target.value))
                        }}>
                        <option value=""> -- </option>
                        {standardArray.map(num => {
                            if(characterData[num+"_bonus"] === 0 || prevAbility1 === score){
                                <option key={num} value={num}>{num}</option>
                            }
                        })}
                    </select> */}
                </td>
            )}
            
            <td style={{width:"7%"}}>+</td>
            {/* Racial Bonus */}
            <td style={{width:"10%"}}>{characterData[asBonus]}</td>
            <td style={{width:"7%"}}>+</td>
            {/* Override */}
            <td style={{width:"12%"}}>
                <input type="number" ref={inputRefOverride} min={0} value={characterData[asOverride]} id='custom-number'
                    onChange={(e) => handleCharacterChange(asOverride, parseInt(e.target.value))}/>
                <div className="spinner-buttons" style={{right:"20%"}}>
                    <button className='up' onClick={() => {incrementValue(asOverride,inputRefOverride,handleCharacterChange)}}></button>
                    <button className='down' onClick={() => {decrementValue(asOverride,inputRefOverride,handleCharacterChange)}}></button>
                </div>
            </td>
            <td style={{width:"7%"}}>=</td>
            {/* Total */}
            <td style={{width:"12%", fontWeight:"bold", fontSize:"1.3rem"}}>{totalAS}</td>
            {/* Modifier */}
            <td style={{width:"15%", fontWeight:"bold", fontSize:"1.3rem"}}>{getAbilityModifier(characterData[as]+characterData[asBonus])}</td>

        </tr>
    )
}

function AddPoint(characterData,valueName,inputRef,handleCharacterChange,availablePoints,setPoints){
    if (inputRef.current && availablePoints > 0) {
        if(characterData[valueName]>=13 && characterData[valueName]<15 && availablePoints > 1){
            setPoints(availablePoints-2);
        }
        else if(characterData[valueName]<13 && availablePoints > 0){
            setPoints(availablePoints-1);
        }
        inputRef.current.stepUp();
        handleCharacterChange(valueName, parseInt(inputRef.current.value));
    }
}

function RemovePoint(characterData,valueName,inputRef,handleCharacterChange,availablePoints,setPoints){
    if (inputRef.current) {
        if(characterData[valueName]>13 && characterData[valueName]<=15){
            setPoints(availablePoints+2);
        }
        else if(characterData[valueName]>8){
            setPoints(availablePoints+1);
        }
        inputRef.current.stepDown();
        handleCharacterChange(valueName, parseInt(inputRef.current.value));
    }
}

function SetBonusAttribute(selection, asState, setState, handleCharacterChange){
    const chosenAbility = selection;
    const bonusKey = `${chosenAbility}_bonus`;
    // 1. Reset the previous one to 0
    if (asState) {
        const prevKey = `${asState}_bonus`;
        handleCharacterChange(prevKey, 0);
    }
    handleCharacterChange(bonusKey, 1);
    setState(chosenAbility);
}
