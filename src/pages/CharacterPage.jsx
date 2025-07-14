import useCharacterData from '../hooks/useCharacterData';
import BasicInfoCard   from '../components/BasicInfoCard';
// import AttributesCard  from '../components/AttributesCard';
// import HPCard          from '../components/HPCard';
// import WeaponsCard     from '../components/WeaponsCard';

export default function CharacterPage({ char }) {
    const { char, loading, error } = useCharacterData(charId);

    if (loading) return <p>Loading…</p>;
    if (error)   return <p>Error: {error}</p>;
    if (!char)   return null;

  return (
    <>
      <BasicInfoCard charId={char} />
      {/* <AttributesCard attributes={char.attributes} />
      <HPCard hp={char.hp} tempHp={char.tempHp} />
      <WeaponsCard weapons={char.weapons} /> */}
    </>
  );
}