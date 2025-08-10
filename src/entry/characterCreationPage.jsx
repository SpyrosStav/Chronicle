import React from 'react';
import ReactDOM from 'react-dom/client';
import CharacterCreationPage from '../pages/CharacterCreationPage';

const root  = document.getElementById('char-list-root');
const domUserId = root.dataset.user_id;

ReactDOM.createRoot(root).render(
  <CharacterCreationPage user_id={domUserId} />
);