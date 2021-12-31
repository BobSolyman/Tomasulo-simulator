function checkBuffer(buffer) {
    for(var i = 0; i < buffer.length; i++) {
        if(buffer[i].busy === 0){
            return true;
        }
    }
    return false;
}

module.exports = checkBuffer;