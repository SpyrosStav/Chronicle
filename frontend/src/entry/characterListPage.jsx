import React from 'react';
import ReactDOM from 'react-dom/client';
import CharacterListPage from '../pages/CharacterListPage';

const root  = document.getElementById('char-list-root');
const domUsername = root.dataset.username;

ReactDOM.createRoot(root).render(
  <CharacterListPage username={domUsername} />
);