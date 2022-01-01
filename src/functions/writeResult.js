const decode = require("./decode")

function writeResult(instruction, id, result, resStation, addBuffer, mulBuffer, loadBuffer, storeBuffer, regFile, instructionQueue, memory, cycle, latencies){
    console.log(regFile)
    var decoded = decode(instruction, latencies)
    var dest = parseInt(decoded.destination.substring(1), 10)
    console.log(dest)
    var stationNo = parseInt(resStation.substring(1), 10) - 1

    if(resStation.includes('A')){
        addBuffer[stationNo].op = ''
        addBuffer[stationNo].Vj = ''
        addBuffer[stationNo].Vk = ''
        addBuffer[stationNo].Qj = ''
        addBuffer[stationNo].Qk = ''
        addBuffer[stationNo].busy = 0
        addBuffer[stationNo].cyclesRemaining = ''
    }
    else if(resStation.includes('M')){
        mulBuffer[stationNo].op = ''
        mulBuffer[stationNo].Vj = ''
        mulBuffer[stationNo].Vk = ''
        mulBuffer[stationNo].Qj = ''
        mulBuffer[stationNo].Qk = ''
        mulBuffer[stationNo].busy = 0
        mulBuffer[stationNo].cyclesRemaining = ''
    }
    else if(resStation.includes('L')){
        loadBuffer[stationNo].address = ''
        loadBuffer[stationNo].busy = 0
        loadBuffer[stationNo].cyclesRemaining = ''
    }
    else if(resStation.includes('S')){
        storeBuffer[stationNo].address = ''
        storeBuffer[stationNo].V = ''
        storeBuffer[stationNo].Q = ''
        storeBuffer[stationNo].busy = 0
        storeBuffer[stationNo].cyclesRemaining = ''
    }

    instructionQueue.writeResult[id] = cycle
      
    if(decoded.name !== "S.D"){
        regFile[dest].value = result
    }

    if(decoded.name === "S.D"){
        memory[parseInt(decoded.destination, 10) - 1] = result
    }

    for(var i in addBuffer){ //for the add buffer
        if(addBuffer[i].Qj === resStation){
            addBuffer[i].Qj = ''
            addBuffer[i].Vj = result
        }
        if(addBuffer[i].Qk === resStation){
            addBuffer[i].Qk = ''
            addBuffer[i].Vk = result
        }
    }

    for(var i in mulBuffer){ //for the multiply buffer
        console.log(i)
        if(mulBuffer[i].Qj === resStation){
            mulBuffer[i].Qj = ''
            mulBuffer[i].Vj = result
        }
        if(mulBuffer[i].Qk === resStation){
            mulBuffer[i].Qk = ''
            mulBuffer[i].Vk = result
        }
    }

    for(var i in storeBuffer){ //for the store buffer
        if(storeBuffer[i].Q === resStation){
            storeBuffer[i].Q = ''
            storeBuffer[i].V = result
        }
    }

    for(var i in regFile){
        if(regFile[i].Q === resStation){
            regFile[i].Q = ''
            regFile[i].value = result
        }
    }

}

module.exports = writeResult