function checkReady(slot) {
    if(slot.Vj) {
        if(slot.Vj !== "" && slot.Vk !== "") {
        return true;
        }
    }
    else if (slot.V) {
        if(slot.V !== "") {
        return true;
        }
    }
    return false;  
}

module.exports = checkReady