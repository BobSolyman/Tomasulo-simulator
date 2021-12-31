function startExecuting(instruction, resStation, addBuffer, mulBuffer, loadBuffer, storeBuffer, cycle, instructionQueue,latencies){
    let pos = instructionQueue.instruction.indexOf(instruction)
    let stationNumber = parseInt(resStation.substring(1)) - 1

    if(resStation.include("A")){
        instructionQueue.execute[pos] = cycle+".."+(cycle+latencies.addLatency-1)
        addBuffer[stationNumber].cyclesRemaining = latencies.addLatency
    }
    else if(resStation.include("M")){
        instructionQueue.execute[pos] = cycle+".."+(cycle+latencies.mulLatency-1)
        mulBuffer[stationNumber].cyclesRemaining = latencies.mulLatency
    }
    else if(resStation.include("L")){
        instructionQueue.execute[pos] = cycle+".."+(cycle+latencies.loadLatency-1)
        loadBuffer[stationNumber].cyclesRemaining = latencies.loadLatency
    }
    else if(resStation.include("S")){
        instructionQueue.execute[pos] = cycle+".."+(cycle+latencies.storeLatency-1)
        storeBuffer[stationNumber].cyclesRemaining = latencies.storeLatency
    }
}

module.exports = startExecuting