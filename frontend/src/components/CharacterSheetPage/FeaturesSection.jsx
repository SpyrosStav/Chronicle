import React, {useEffect, useRef} from 'react';

export default function FeaturesSection({features, isEditing, onStatChange, handleFeatureDelete, newFeatures, setNewFeatures}){

    // FEATURE CHANGE
    function handleFeatureChange(featureId, field, value) {
        console.log("Start");
        const updatedFeatures = features.map((feature) =>
            feature.feature_id === featureId
            ? { ...feature, [field]: value }
            : feature
        );

        onStatChange('features', updatedFeatures);
    }

    // NEW WEAPON INPUT
    function newFeatureInput() {
        setNewFeatures((prev) => [...prev, {feature_id: Date.now(), description: '', 
            level_required: null, title: ''}]); 
    }

    function handleNewFeatureChange(id, fieldName, value) {
        setNewFeatures(prevFeatures =>
            prevFeatures.map(f =>
                f.feature_id === id
                ? { ...f, [fieldName]: value } : f
            )
        );
    }

    function removeNewFeature(idToRemove) {
        setNewFeatures((prev) => prev.filter((feature) => feature.feature_id !== idToRemove));
    }

    return(
    <div className="characterFeatures ">
        <div className='text-center' style={{marginBottom:"5px", fontSize:"1.2rem", fontWeight:"600"}}>CLASS FEATURES</div>

        {features.map((feature)=> (

            isEditing ? 
            (<div key={feature.id} className='featureContainer backgroundCard' style={{marginBottom:"20px"}}>

                <div className='featureTitleAndLevel'>
                    <div className='featureTitle'>
                        <input type='text' value={feature.title}
                        className='text-center feature-input feature-input-title'
                        onChange={(e) => handleFeatureChange(feature.feature_id,'title', e.target.value)}/>
                    </div>
                    <div className='featureLevel text-center'>
                        <span>Level</span>
                        <input type='number' value={feature.level_required}
                        className='text-center feature-input feature-input-level'
                        onChange={(e) => handleFeatureChange(feature.feature_id,'level_required', e.target.value)}/>
                    </div>
                </div>
                <AutoResizingTextarea id={feature.feature_id} value={feature.description} handleFeatureChange={handleFeatureChange} />

                <button className='feature-delete-button' style={{position: "absolute", right:"5px", bottom:"10px"}}
                    onClick={() => {handleFeatureDelete(feature.feature_id)}}>
                </button>

            </div>) : 
            (
                <div key={feature.id} className='featureContainer backgroundCard'>

                    <div className='featureTitleAndLevel'>
                        <div className='featureTitle text-center'>{feature.title}</div>
                        <div className='featureLevel text-center'>
                            <span>Level</span>
                            <span>{feature.level_required}</span>
                        </div>
                    </div>
                    <div style={{whiteSpace:"pre-wrap"}}>{feature.description}</div>

                </div>
            )           

        ))}

        {isEditing && newFeatures.map((feature) => (
            <FeatureBlock key={`new-${feature.feature_id}`} handleNewFeatureChange={handleNewFeatureChange} 
            feature={feature} onRemove={() => removeNewFeature(feature.feature_id)}/>
        ))}
        
        {isEditing ? 
            (<button className='add-feature-btn col-12' onClick={newFeatureInput}>
                ADD FEATURE <span style={{fontSize:"1.3rem", fontWeight:"bold"}}>+</span>
            </button>) :  (null)
        } 
        
    </div>
    )

}

function AutoResizingTextarea({id, value, handleFeatureChange}) {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        }
    }, [value]);

    return (
        <textarea ref={textareaRef} value={value}
            placeholder="Enter feature description..."
            className="feature-input feature-input-description"
            onChange={(e) => handleFeatureChange(id,'description', e.target.value)}
        />
    );
}

function FeatureBlock({feature, handleNewFeatureChange, onRemove}) {
    return(

        <div key={feature.feature_id} className='featureContainer lightBackground'>

                <div className='featureTitleAndLevel'>
                    <div className='featureTitle'>
                        <input type='text'
                        placeholder='Title'
                        className='text-center feature-input feature-input-title'
                        onChange={(e) => handleNewFeatureChange(feature.feature_id,'title', e.target.value)}/>
                    </div>
                    <div className='featureLevel text-center'>
                        <span>Level</span>
                        <input type='number'
                        placeholder='#'
                        className='text-center feature-input feature-input-level'
                        onChange={(e) => handleNewFeatureChange(feature.feature_id,'level_required', e.target.value)}/>
                    </div>
                </div>
                <AutoResizingTextarea id={feature.feature_id} value={feature.description} handleFeatureChange={handleNewFeatureChange} />

                <button className='feature-delete-button' style={{position: "absolute", right:"10px", bottom:"10px"}}
                    onClick={() => {onRemove(feature.feature_id)}}>
                </button>

            </div>
    );
}