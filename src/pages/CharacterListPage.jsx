import React, { useEffect, useState } from 'react';
import useCharacterList from '../hooks/useCharacterList';
import CharacterList from '../components/CharacterListPage/CharacterList';

export default function CharacterListPage({ username }) {
  const {charList, loading, error} = useCharacterList()
  const [characters,setCharacters] = useState([]);

  useEffect(() => {
    if(charList){
      setCharacters(charList);

      const bgWrapper = document.getElementById("content-wrap");
      if (bgWrapper) {
        bgWrapper.classList.remove("bg-loading");
        bgWrapper.classList.add("bg-loaded");
      }
    }
  }, [charList]);

  if (loading) return <p>Loading…</p>;
  if (error)   return <p>Error: {error}</p>;
  // if (!characters) return null;

  return (
    <>
      <h2 style={{textAlign: 'center', marginTop: "50px", 
        marginBottom: "10px", fontWeight: "600", fontSize:"2.7em", color: "#3f2705ff", 
        textShadow: "3px 3px 4px #926019ff"}}>CHARACTER LIST</h2>
      <button className='btn backgroundCard createCharBtn'>Create new Character</button>
      <CharacterList characterlist = {characters}></CharacterList>
    </>
  )
}
