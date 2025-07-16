import { useEffect, useState } from 'react';

export default function useCharacterData(charId) {
  const [char, setChar]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!charId) return;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);
    setError(null);

    fetch(`/api/character/${charId}` , { signal })
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
    }, [charId]);

  return { char, loading, error };
}
