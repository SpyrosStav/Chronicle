import React from 'react';
import ReactDOM from 'react-dom/client';
import CharacterPage from '../pages/CharacterPage';


// const charData = {
//   imageSrc: "static/images/charImage.jpg",
//   level: 14,
//   name: "Nef",
//   charSubClass: "Gnosiaki",
//   charClass: "Psyxologos",
//   race: "Goblin",
//   background: "Patrinia",
//   alignment: "Chaotic",
//   imageURL: "/static/images/charImage.jpg"
// };

const root  = document.getElementById('char-sheet-root');
const domCharId = root.dataset.charid;

ReactDOM.createRoot(root).render(
  <CharacterPage charId={domCharId} />
);