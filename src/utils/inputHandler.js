export function incrementValue (valueName, inputRef, onStatChange) {
    if (inputRef.current) {
    inputRef.current.stepUp();
    onStatChange(valueName, parseInt(inputRef.current.value));
    }
}

export function decrementValue (valueName, inputRef, onStatChange) {
    if (inputRef.current) {
    inputRef.current.stepDown();
    onStatChange(valueName, parseInt(inputRef.current.value));
    }
}