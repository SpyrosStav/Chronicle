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

  const handleClick = () => {
    window.location.href = "/charactercreation";
  }

  return (
    <>
      <h2>CHARACTER LIST</h2>
      
      <a href="/charactercreation" className="btn backgroundCard createCharBtn">Create new Character</a>
      {/* <button className='btn backgroundCard createCharBtn' onClick={handleClick}>Create new Character</button> */}
      
      <CharacterList characterlist = {characters}></CharacterList>
    </>
  )
}
