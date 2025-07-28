import React from 'react';
import ReactDOM from 'react-dom/client';
import CharacterSheetPage from '../pages/CharacterSheetPage';

const root  = document.getElementById('char-sheet-root');
const domCharId = root.dataset.charid;
const domUserId = root.dataset.userid;

ReactDOM.createRoot(root).render(
  <CharacterSheetPage charId={domCharId} userId={domUserId} />
);