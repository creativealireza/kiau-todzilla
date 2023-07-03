export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const removeData = (key) => {
    localStorage.removeItem(key);
}

export const readData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const updateKeyObject = (key, keyObject, data) => {
    const oldData = JSON.parse(localStorage.getItem(key));
    oldData[`${keyObject}`] = data;
    localStorage.setItem(key, JSON.stringify(oldData))
}