import { useEffect, useState } from 'react';

export default function useCharacterData(characterId) {
  const [character, setChar]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!characterId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch(`/api/character/${characterId}` , { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => { setChar(data); setLoading(false); })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'Unknown error');
        setLoading(false);
      });

      return () => {
      controller.abort();
      };
    }, [characterId]);

  return { character, loading, error };
}
