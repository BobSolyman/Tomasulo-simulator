function writeToRegisterFile(Q, value){
    if(Q!==""){
        return {Q: Q, value: ""}
    }
    return {Q: "", value: parseFloat(value)}
}

module.exports = writeToRegisterFile;