import React from 'react';
import ReactDOM from 'react-dom/client';
import CharacterSheetPage from '../pages/CharacterSheetPage';

const root  = document.getElementById('char-sheet-root');
const domCharacterId = root.dataset.characterid;
const domUserId = root.dataset.userid;

ReactDOM.createRoot(root).render(
  <CharacterSheetPage characterId={domCharacterId} userId={domUserId}/>
);