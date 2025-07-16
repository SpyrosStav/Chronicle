import React, {useState, useEffect} from 'react';
import useCharacterData from '../hooks/useCharacterData';
import BasicInfoCard   from '../components/BasicInfoCard';
import MainCard from '../components/MainCard'


export default function CharacterPage({charId}) {
    //Character Fetch from Backend
    const {char, loading, error} = useCharacterData(charId);

    //States Declaration
    const [originalStats, setOriginalStats] = useState(null);
    const [editableStats, setEditableStats] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
      if (char) {
        setEditableStats({ 
          ...char,
          skills: char.skills || {}
        });
        setOriginalStats({ 
          ...char,
          skills: char.skills || {} 
        });
      }
    }, [char]);

    if (loading) return <p>Loading…</p>;
    if (error)   return <p>Error: {error}</p>;
    if (!editableStats) return null;

    const handleStatChange = (statName, value) => {
      setEditableStats((prev) => ({
        ...prev,
        [statName]: value,
      }));
    };

    const handleImageChange = (e) => { 
      const file = e.target.files[0];
      if (file) {
        setSelectedImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setEditableStats((prev) => ({
            ...prev,
            profile_image_path: reader.result,
          }));
        };
        reader.readAsDataURL(file);

        setEditableStats((prev) => ({
            ...prev,
            profile_image_path: file.name,
          }));
      }
    };

    const handleSave = async () => {
      const formData = new FormData();
      formData.append("characterData", JSON.stringify(editableStats));

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      try {
        const response = await fetch(`/api/update-character/${charId}`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Character updated successfully!");
        }
      } catch (error) {
        console.error("Error updating character:", error);
      }
    };

    const handleCancel = () => {
      setEditableStats(originalStats);
      setIsEditing(false);
    }

  return (
    <>
    <div className='editBtnsDiv'>
      {isEditing ?
        ( <>
            <button className='btn btn-light divshadow' onClick={() => {
              handleSave();
              setIsEditing(!isEditing);
            }}> Save </button>
            <button className='btn btn-light divshadow' onClick={handleCancel}> Cancel </button>
          </>) : 
        (<button className='btn btn-light divshadow' onClick={() => setIsEditing(!isEditing)}> Edit </button>)
        }
    </div>

      <BasicInfoCard char={editableStats} onStatChange={handleStatChange} isEditing={isEditing} onImageChange={handleImageChange}/>
      <MainCard char={editableStats} onStatChange={handleStatChange} isEditing={isEditing}/>
    </>
  );
}