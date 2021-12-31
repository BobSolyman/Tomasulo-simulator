function startExecuting(instruction, id, resStation, addBuffer, mulBuffer, loadBuffer, storeBuffer, cycle, instructionQueue, latencies){
    let stationNumber = parseInt(resStation.substring(1)) - 1
    if(resStation.includes("A")){
        instructionQueue.execute[id] = cycle+".."+parseInt(cycle+latencies.addLatency-1)
        addBuffer[stationNumber].cyclesRemaining = parseInt(latencies.addLatency-1)
    }
    else if(resStation.includes("M")){
        instructionQueue.execute[id] = cycle+".."+parseInt(cycle+latencies.mulLatency-1)
        mulBuffer[stationNumber].cyclesRemaining = parseInt(latencies.mulLatency-1)
    }
    else if(resStation.includes("L")){
        instructionQueue.execute[id] = cycle+".."+parseInt(cycle+latencies.loadLatency-1)
        loadBuffer[stationNumber].cyclesRemaining = parseInt(latencies.loadLatency-1)
    }
    else if(resStation.includes("S")){
        instructionQueue.execute[id] = cycle+".."+parseInt(cycle+latencies.storeLatency-1)
        storeBuffer[stationNumber].cyclesRemaining = parseInt(latencies.storeLatency-1)
    }
}

module.exports = startExecuting