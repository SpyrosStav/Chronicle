import React, {useState} from 'react';

export default function CharacterList({characterlist}){

    return (
    <div className='mainListCard'>
        {characterlist.map((character) => (
            <a key={character.character_id} className='characterCard' href={`/charactersheet/${character.character_id}`}>
                <div className="charImageWrapper">
                        <img src={character.profile_image_path} alt="character-image"/>
                </div>
                <div className='basicStats'>
                    <div className='charName'>{character.character_name.toUpperCase()}</div>
                    <hr style={{ borderColor: '#473110e8', margin: '5px 0' }} />
                    <div className='classInfo mb-2'>{character.subclass} {character.class} - Level {character.level}</div>
                    <div className='mb-2'>
                        <div><span className="label">Race:</span> {character.race}</div>
                        <div><span className="label">Background:</span> {character.background}</div>
                        <div><span className="label">Max Hit Points:</span> {character.max_hp}</div>
                        <div><span className="label">Current Hit Points:</span> {character.c_hp}</div>
                    </div>

                    <div className='abiltyScores'>
                        <div className='row'>
                            <div className='col-md-6 col-12'>
                                <div className='singleAbiltyScore'>
                                    <img src="/static/images/svg/biceps-flexed.svg" alt="" />
                                    <div><span className="label">Strength:</span> {character.strength}</div>
                                </div>
                                <div className='singleAbiltyScore'>
                                    <img src="/static/images/svg/bow.svg" alt="" />
                                    <div><span className="label">Dexterity:</span> {character.dexterity}</div>
                                </div>
                                <div className='singleAbiltyScore'>
                                    <img src="/static/images/svg/heart.svg" alt="" />
                                    <div><span className="label">Constitution:</span> {character.constitution}</div>
                                </div>
                            </div>
                            <div className='col-md-6 col-12'>
                                <div className='singleAbiltyScore'>
                                    <img src="/static/images/svg/brain.svg" alt="" />
                                    <div><span className="label">Intelligence:</span> {character.intelligence}</div>
                                </div>
                                <div className='singleAbiltyScore'>
                                    <img src="/static/images/svg/book.svg" alt="" />
                                    <div><span className="label">Wisdom:</span> {character.wisdom}</div>
                                </div>
                                <div className='singleAbiltyScore'>
                                    <img src="/static/images/svg/chatbubble.svg" alt="" />
                                    <div><span className="label">Charisma:</span> {character.charisma}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </a>
        ))}
    </div>
    )
}
