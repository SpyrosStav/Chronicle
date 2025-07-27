import React, {useState, useEffect} from 'react';
import useCharacterData from '../hooks/useCharacterData';
import BasicInfoCard   from '../components/CharacterSheetPage/BasicInfoCard';
import MainCard from '../components/CharacterSheetPage/MainCard';


export default function CharacterSheetPage({charId}) {
  //Character Fetch from Backend
  const {char, loading, error} = useCharacterData(charId);

  //States Declaration
  const [originalStats, setOriginalStats] = useState(null);
  const [editableStats, setEditableStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

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

      const bgWrapper = document.getElementById("content-wrap");
      if (bgWrapper) {
        bgWrapper.classList.remove("bg-loading");
        bgWrapper.classList.add("bg-loaded");
      }
    }
  }, [char]);

  if (loading) return null;
  if (error)   return <p>Error: {error}</p>;
  if (!editableStats) return null;

  const handleStatChange = (statName, value) => {
    setEditableStats((prev) => ({
      ...prev,
      [statName]: value,
    }));
  };

  // IMAGE CHANGE
  const handleImageChange = (e) => { 
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // handleStatChange('profile_image_path', reader.result)
    }
  };

  // HANDLE SAVING
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("characterData", JSON.stringify(editableStats));

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
    
    if (selectedImage && imagePreviewUrl) {
      setEditableStats((prev) => ({
        ...prev,
        profile_image_path: imagePreviewUrl,
      }));
    }

    try {
      const response = await fetch(`/api/update-character/${charId}`, {
        method: "POST",
        body: formData,
      })

      const result = await response.json();

      if (response.ok) {
        console.log("Character updated successfully!");
        showToast(result.message, result.status);
      } else {
        console.error("Server returned an error:", result.message || response.statusText);
        showToast(result.message || "Σφάλμα ενημέρωσης χαρακτήρα", "danger");
      }
    } 
    catch (error) {
      console.error("Error updating character:", error);
      showToast("Αποτυχία σύνδεσης με τον server", "danger");
    }
  };

  const handleCancel = () => {
    setEditableStats(originalStats);
    setIsEditing(false);
    setImagePreviewUrl(null);
  }

  return (
    <>
      <div className='editBtnsDiv'>
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
      </div>

      <BasicInfoCard char={editableStats} onStatChange={handleStatChange} isEditing={isEditing} imagePreviewUrl = {imagePreviewUrl} onImageChange={handleImageChange}/>
      <MainCard char={editableStats} onStatChange={handleStatChange} isEditing={isEditing}/>
    </>
  );
}