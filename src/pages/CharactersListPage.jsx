// import { useEffect, useState } from 'react';

// export default function UsersCharactersPage({ userId }) {
//   const [chars, setChars] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`/api/users/${userId}/characters`)
//       .then(r => r.json())
//       .then(data => { setChars(data); setLoading(false); });
//   }, [userId]);

//   if (loading) return <p>Loading…</p>;

//   return (
//     <ul>
//       {chars.map(c => (
//         <li key={c.id}>
//           {c.name} – Level {c.level}
//         </li>
//       ))}
//     </ul>
//   );
// }
