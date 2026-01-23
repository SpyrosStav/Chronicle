import { useEffect, useState } from 'react';

export default function useCharacterList(){
    const [charList, setChar]   = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        setLoading(true);
        setError(null);

        fetch('/api/list-of-characters/', {signal})
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => { setChar(data); setLoading(false); })
        .catch((err) => {
            if (err.name === 'AbortError') {
            return;
            }
            setError(err.message || 'Unknown error');
            setLoading(false);
        })

        return () => {
        controller.abort();
        };

    }, []);
    
    return {charList, loading, error};
}