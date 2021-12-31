function startExecuting(instruction, resStation, addBuffer, mulBuffer, loadBuffer, storeBuffer, cycle, instructionQueue,latencies){
    let pos = instructionQueue.instruction.indexOf(instruction)
    instructionQueue.execute[pos] = cycle
    let stationNumber = parseInt(resStation.substring(1)) - 1

    if(resStation.include("A")){
        addBuffer[stationNumber].cyclesRemaining = latencies.addLatency
    }
    else if(resStation.include("M")){
        mulBuffer[stationNumber].cyclesRemaining = latencies.mulLatency
    }
    else if(resStation.include("L")){
        loadBuffer[stationNumber].cyclesRemaining = latencies.loadLatency
    }
    else if(resStation.include("S")){
        storeBuffer[stationNumber].cyclesRemaining = latencies.storeLatency
    }
}

module.exports = startExecuting