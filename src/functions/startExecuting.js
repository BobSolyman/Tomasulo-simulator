function startExecuting(instruction, id, resStation, addBuffer, mulBuffer, loadBuffer, storeBuffer, cycle, instructionQueue, latencies){
    let stationNumber = parseInt(resStation.substring(1)) - 1
    if(resStation.includes("A")){
        instructionQueue.execute[id] = cycle + ".."
        if(latencies.addLatency === 1) {
            instructionQueue.execute[id] += cycle
        }
        addBuffer[stationNumber].cyclesRemaining = parseInt(latencies.addLatency-1)
    }
    else if(resStation.includes("M")){
        instructionQueue.execute[id] = cycle + ".."
        if(latencies.mulLatency === 1) {
            instructionQueue.execute[id] += cycle
        }
        mulBuffer[stationNumber].cyclesRemaining = parseInt(latencies.mulLatency-1)
    }
    else if(resStation.includes("L")){
        instructionQueue.execute[id] = cycle + ".."
        if(latencies.loadLatency === 1) {
            instructionQueue.execute[id] += cycle
        }
        loadBuffer[stationNumber].cyclesRemaining = parseInt(latencies.loadLatency-1)
    }
    else if(resStation.includes("S")){
        instructionQueue.execute[id] = cycle + ".."
        if(latencies.storeLatency === 1) {
            instructionQueue.execute[id] += cycle
        }
        storeBuffer[stationNumber].cyclesRemaining = parseInt(latencies.storeLatency-1)
    }
}

module.exports = startExecuting