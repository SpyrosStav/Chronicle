import React, {useState, useEffect} from 'react';
import useCharacterData from '../hooks/useCharacterData';
import CharacterHeader   from '../components/CharacterSheetPage/CharacterHeader';
import HeroDashboard from '../components/CharacterSheetPage/HeroDashboard';


export default function CharacterSheetPage({characterId, userId}) {

  // 1. Fetch character data from server
  const {character, loading, error} = useCharacterData(characterId);
  // Stats States
  const [originalStats, setOriginalStats] = useState(null);
  const [editableStats, setEditableStats] = useState(null);
  const [newWeapons, setNewWeapons] = useState([]);
  const [deletedWeaponIds, setDeletedWeaponIds] = useState([]);
  const [newFeatures, setNewFeatures] = useState([]);
  const [deletedFeaturesIds, setDeletedFeaturesIds] = useState([]);
  // Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  // Character Image states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  // Fetching character data
  useEffect(() => {
    if (character) {
      setEditableStats({...character, skills: character.skills || {}, weapons: character.weapons || {}});
      setOriginalStats({...character, skills: character.skills || {}, weapons: character.weapons || {}}); 

      const bgWrapper = document.getElementById("content-wrap");
      if (bgWrapper) {
        bgWrapper.classList.remove("bg-loading");
        bgWrapper.classList.add("bg-loaded");
      }
    }
  }, [character]);

  
  // Return if character data not fetched
  if (loading) return null;
  if (error)   return <p>Error: {error}</p>;
  if (!editableStats) return null;

  // Handle a stat change
  const handleStatChange = (statName, value) => {
    setEditableStats((prev) => ({...prev, [statName]: value,}));
  };

  // Handle the Image Change
  const handleImageChange = (e) => { 
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => { setImagePreviewUrl(reader.result); };
    reader.readAsDataURL(file);
  };

  // Insert Weapon Ids to Delete
  const handleWeaponDelete = (weaponId) => {
    if (!weaponId) return;
    setDeletedWeaponIds((prev) => [...prev, weaponId]);
    handleStatChange('weapons', editableStats.weapons.filter(weapon => weapon.weapon_id !== weaponId));
  };

  // Insert Feature Ids to Delete
  const handleFeatureDelete = (featureId) => {
    if (!featureId) return;
    setDeletedFeaturesIds((prev) => [...prev, featureId]);
    handleStatChange('features', editableStats.features.filter(feature => feature.feature_id !== featureId));
  };



  // ------------------------------------- SAVE CHANGES -------------------------------------
  // --- 1. Update base character ---
  const updateCharacter = async () => {
    const formData = new FormData();
    formData.append("characterData", JSON.stringify(editableStats));
    if (selectedImage) formData.append("image", selectedImage);

    const response = await fetch(`/api/update-character/${characterId}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Update failed");
    return result;
  };

  // --- 2. Delete weapons ---
  const deleteWeapons = async () => {
    if (deletedWeaponIds.length === 0) return;

    const response = await fetch('/api/delete-weapon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deletedWeaponIds),
    });

    if (!response.ok) throw new Error("Error deleting weapons");
  };

  // --- 3. Delete features ---
  const deleteFeatures = async () => {
    if (deletedFeaturesIds.length === 0) return;

    const response = await fetch('/api/delete-feature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(deletedFeaturesIds),
    });

    if (!response.ok) throw new Error("Error deleting features");
  };
  // --- 4. Insert new weapons ---
  const insertWeapons = async () => {
    if (newWeapons.length === 0) return;

    const response = await fetch(`/api/add-weapon/${characterId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newWeapons),
    });

    if (!response.ok) throw new Error("Error inserting new weapons");
  };

  // --- 5. Insert new features
  const insertFeatures = async () => {
    if (newFeatures.length === 0) return;

    const response = await fetch(`/api/add-feature/${characterId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeatures),
    });

    if (!response.ok) throw new Error("Error inserting new features");
  };

  // --- 6. Refetch ---
  const refetchCharacter = async () => {
    const response = await fetch(`/api/character/${characterId}`);
    const updatedChar = await response.json();
    setEditableStats({ ...updatedChar, skills: updatedChar.skills || {}, weapons: updatedChar.weapons || {} });
    setOriginalStats({ ...updatedChar, skills: updatedChar.skills || {}, weapons: updatedChar.weapons || {} });
  };

  // --- 7. Actual Save ---
  const handleSave = async () => {
    try {
      await updateCharacter();
      await deleteWeapons();
      await deleteFeatures();
      await insertWeapons();
      await insertFeatures();
      await refetchCharacter();
      showToast("Character updated successfully!", "success");
    } catch (error) {
      console.error(error);
      showToast(error.message || "Save failed", "danger");
    }
  };
  // ------------------------------------- END OF SAVE CHANGES -------------------------------------

  // Cancel Changes
  const handleCancel = () => {
    setEditableStats(originalStats);
    setIsEditing(false);
    setImagePreviewUrl(null);
    setDeletedWeaponIds([]);
    setNewWeapons([]);
    setDeletedFeaturesIds([]);
    setNewFeatures([]);
  }
  
  // Show edit button if user is character owner
  const canEdit = Number(userId) === Number(character.player_id);

  return (
  <>
    {canEdit ? 
      (<div className='editBtnsDiv'>{canEdit}
        {isEditing ?
          (<>
              <button className=' divshadow medieval-button' onClick={() => {
                handleSave();
                setIsEditing(!isEditing);
              }}> Save </button>
              <button className=' divshadow medieval-button' onClick={handleCancel}> Cancel </button>
            </>) : 
          (<button className=' divshadow medieval-button' onClick={() => setIsEditing(!isEditing)}> Edit </button>)
        }
      </div>) : (null)
    }

    {/* Character Bio */}
    <CharacterHeader characterData={editableStats} onStatChange={handleStatChange} isEditing={isEditing} 
      imagePreviewUrl = {imagePreviewUrl} onImageChange={handleImageChange}/>

    {/* Character Stats */}
    <HeroDashboard characterData={editableStats} onStatChange={handleStatChange} isEditing={isEditing} 
      handleWeaponDelete={handleWeaponDelete} newWeapons={newWeapons} setNewWeapons={setNewWeapons}
      handleFeatureDelete={handleFeatureDelete} newFeatures={newFeatures} setNewFeatures={setNewFeatures}/>

  </>
  )
}