function checkReady(slot) {
    if(slot.Vj !== undefined) {
        if(slot.Vj !== "" && slot.Vk !== "") {
            return true;
        }
        else 
            return false;
    }
    else if (slot.V !== undefined) {
        if(slot.V !== "") {
            return true;
        }
        else
            return false;
    }
    else if (slot.V === undefined && slot.Vj === undefined) {
        return true;
    }
    return false;  
}

module.exports = checkReady