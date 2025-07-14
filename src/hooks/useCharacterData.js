import { useEffect, useState } from 'react';

export default function useCharacterData(charId) {
  const [char, setChar]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/characters/${charId}`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => { setChar(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [charId]);

  return { char, loading, error };
}
