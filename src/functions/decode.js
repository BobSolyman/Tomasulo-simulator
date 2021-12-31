function decode(instruction, latencies){
    console.log("decode :: ", instruction)
    const name = instruction.split(" ")[0]
    const r1 = instruction.split(" ")[1].substring(0, instruction.split(" ")[1].length-1)
    if(name==="L.D"){
        return {name, destination: r1, source1: instruction.split(" ")[2], latency: latencies.loadLatency}
    }
    else if(name==="S.D"){
        return {name, source1: r1, destination: instruction.split(" ")[2], latency: latencies.loadLatency}
    }
    else{
        const r2 = instruction.split(" ")[2].substring(0, instruction.split(" ")[2].length-1)
        const r3 = instruction.split(" ")[3]
        if(name==="MUL.D" || name==="DIV.D"){
            return {name, destination: r1, source1: r2, source2: r3, latency: latencies.mulLatency}
        }
        if(name==="ADD.D" || name==="SUB.D"){
            return {name, destination: r1, source1: r2, source2: r3, latency: latencies.addLatency}
        }
    }
}

module.exports = decode;