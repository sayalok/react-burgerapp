export const updateObject = (oldObject, Updatedproperties) => {
    return {
        ...oldObject,
        ...Updatedproperties
    }
}