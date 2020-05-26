export const onInputChange = (target, object) => {
    if (object.hasOwnProperty(target.name)) {
        const objectCopy = {...object}
        objectCopy[target.name] = target.value
        return objectCopy
    }
    console.error('Unknown property', target.name, object)
}