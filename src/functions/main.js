const Init = require("./init")
const setLatencies = require("./setLatencies")

const addInstruction = require("./addInstruction")
const issueInstruction = require("./issueInstruction")
const startExecuting = require("./startExecuting")
const writeResult = require("./writeResult")
const checkReady = require("./checkReady")
const checkBuffer = require("./checkBuffer")
const decode = require("./decode")

var clock = 1;

var instructionQueue, A1, A2, A3, addBuffer, M1, M2, M3, mulBuffer, L1, L2, loadBuffer, S1, S2, storeBuffer, registerFile, memory, latencies

var num = 0;
function start(instructions, addLatency, mulLatency, loadLatency, storeLatency) {
    var init = Init()
    instructionQueue = init[0]

    A1 = init[1].A1
    A2 = init[1].A2
    A3 = init[1].A3
    addBuffer = [A1, A2, A3]

    M1 = init[2].M1
    M2 = init[2].M2
    M3 = init[2].M3
    mulBuffer = [M1, M2, M3]

    L1 = init[3].L1
    L2 = init[3].L2
    loadBuffer = [L1, L2]

    S1 = init[4].S1
    S2 = init[4].S2
    storeBuffer = [S1, S2]

    registerFile = init[5] //access register using registerFile[x]
    memory = init[6].data //access memory address using memory[x]

    latencies = setLatencies(addLatency, mulLatency, loadLatency, storeLatency)

    for(var i in instructions) {
        addInstruction(instructions[i], instructionQueue)
        num++
    }
}
 
function click() {
    var size = num
    var writes = 0;
    for(var i = 0; i < size; i++) {
        if(instructionQueue.issue[i] !== undefined && instructionQueue.execute[i] !== undefined && instructionQueue.writeResult[i] !== undefined) {
            writes ++;
        }
    }
    if(writes !== size) {
        nextClock()
        clock++
    }
}

function nextClock() {
        console.log("Cycle: " ,clock, "--------------------------------------------------------------------------------")
        for(var i in addBuffer) {
            if(addBuffer[i].cyclesRemaining !== "") {
                addBuffer[i].cyclesRemaining = parseInt(addBuffer[i].cyclesRemaining) - 1 
            }
        }

        for(var i in mulBuffer) {
            if(mulBuffer[i].cyclesRemaining !== "") {
                mulBuffer[i].cyclesRemaining = parseInt(mulBuffer[i].cyclesRemaining) - 1 
            }
        }

        for(var i in loadBuffer) {
            if(loadBuffer[i].cyclesRemaining !== "") {
                loadBuffer[i].cyclesRemaining = parseInt(loadBuffer[i].cyclesRemaining) - 1 
            }
        }

        for(var i in storeBuffer) {
            if(storeBuffer[i].cyclesRemaining !== "") {
                storeBuffer[i].cyclesRemaining = parseInt(storeBuffer[i].cyclesRemaining) - 1 
            }
        }
        for(var i = 0; i< instructionQueue.id.length; i++) {     
            if(instructionQueue.issue[i] !== undefined && instructionQueue.execute[i]) {
                if(!instructionQueue.execute[i].split("..")[1]) {
                    var decoded = decode(instructionQueue.instruction[i], latencies)
                    if(decoded.name === "MUL.D" || decoded.name === "DIV.D"){
                        if(clock === parseInt(instructionQueue.execute[i].split("..")[0]) + parseInt(latencies.mulLatency) - 1) {
                            instructionQueue.execute[i] += clock
                        }
                    }
                    else if(decoded.name === "ADD.D" || decoded.name === "SUB.D"){
                        if(clock === parseInt(instructionQueue.execute[i].split("..")[0]) + parseInt(latencies.addLatency) - 1) {
                            instructionQueue.execute[i] += clock
                        }
                    }
                    else if(decoded.name === "L.D"){
                        if(clock === parseInt(instructionQueue.execute[i].split("..")[0]) + parseInt(latencies.loadLatency) - 1) {
                            instructionQueue.execute[i] += clock
                        }
                    }
                    else if(decoded.name === "S.D"){
                        if(clock === parseInt(instructionQueue.execute[i].split("..")[0]) + parseInt(latencies.storeLatency) - 1) {
                            instructionQueue.execute[i] += clock
                        }
                    }
                }
            }
        }

        for(var i = 0; i < instructionQueue.id.length; i++) { //WriteResult
            if(instructionQueue.issue[i] !== undefined && instructionQueue.execute[i] !== undefined && instructionQueue.writeResult[i] === undefined){
                if(parseInt(instructionQueue.execute[i].split("..")[1]) === parseInt(clock) - 1) {
                    var inst = instructionQueue.id[i]
                    var decoded = decode(instructionQueue.instruction[i], latencies)
                    if(decoded.name === "MUL.D" ) {
                        for(var j in mulBuffer) {
                            var tmp = parseInt(j) + 1
                            if(mulBuffer[j].id === inst) {
                                writeResult(instructionQueue.instruction[i], inst, (parseFloat(mulBuffer[j].Vj) * parseFloat(mulBuffer[j].Vk)).toPrecision(4) , "M" + tmp, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, memory, clock, latencies)
                                break;
                            }
                        }
                    }
                    else if(decoded.name === "DIV.D" ) {
                        for(var j in mulBuffer) {
                            var tmp = parseInt(j) + 1
                            if(mulBuffer[j].id === inst) {
                                writeResult(instructionQueue.instruction[i], inst, (parseFloat(mulBuffer[j].Vj) / parseFloat(mulBuffer[j].Vk)).toPrecision(4) , "M" + tmp, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, memory, clock, latencies)
                                break;
                            }
                        }
                    }
                    else if(decoded.name === "ADD.D" ) {
                        for(var j in addBuffer) {
                            var tmp = parseInt(j) + 1
                            if(addBuffer[j].id === inst) {
                                writeResult(instructionQueue.instruction[i], inst, (parseFloat(addBuffer[j].Vj) + parseFloat(addBuffer[j].Vk)).toPrecision(4) , "A" + tmp, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, memory, clock, latencies)
                                break;
                            }
                        }
                    }
                    else if(decoded.name === "SUB.D" ) {
                        for(var j in addBuffer) {
                            var tmp = parseInt(j) + 1
                            if(addBuffer[j].id === inst) {
                                writeResult(instructionQueue.instruction[i], inst, (parseFloat(addBuffer[j].Vj) - parseFloat(addBuffer[j].Vk)).toPrecision(4) , "A" + tmp, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, memory, clock, latencies)
                                break;
                            }
                        }
                    }
                    else if(decoded.name === "L.D" ) {
                        var dest = parseInt(decoded.source1)
                        for(var j in loadBuffer) {
                            var tmp = parseInt(j) + 1
                            if(loadBuffer[j].id === inst) {
                                writeResult(instructionQueue.instruction[i], inst, memory[dest] , "L" + tmp, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, memory, clock, latencies)
                                break;
                            }
                        }
                    }
                    else if(decoded.name === "S.D" ) {
                        for(var j in storeBuffer) {
                            var tmp = parseInt(j) + 1
                            if(storeBuffer[j].id === inst) {
                                writeResult(instructionQueue.instruction[i], inst, parseFloat(storeBuffer[j].V) , "S" + tmp, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, memory, clock, latencies)
                                break;
                            }
                        }
                    }
                }
            }
        }

        for(var i = 0; i < instructionQueue.id.length; i++) { //Execute
            if(instructionQueue.issue[i] !== undefined && instructionQueue.execute[i] === undefined){
                var inst = instructionQueue.id[i]
                var decoded = decode(instructionQueue.instruction[i], latencies)
                if(decoded.name === "MUL.D" || decoded.name === "DIV.D") {
                    for(var j in mulBuffer) {
                        if(mulBuffer[j].id === inst) {
                            if(checkReady(mulBuffer[j])) {
                                var tmp = parseInt(j) + 1
                                startExecuting(instructionQueue.instruction[i], inst, "M" + tmp , addBuffer, mulBuffer, loadBuffer, storeBuffer, clock, instructionQueue, latencies)
                                break;
                            }
                        }
                    }
                }
                else if(decoded.name === "ADD.D" || decoded.name === "SUB.D") {
                    for(var j in addBuffer) {
                        if(addBuffer[j].id === inst) {
                            if(checkReady(addBuffer[j])) {
                                var tmp = parseInt(j) + 1
                                startExecuting(instructionQueue.instruction[i], inst, "A" + tmp , addBuffer, mulBuffer, loadBuffer, storeBuffer, clock, instructionQueue, latencies)
                                break;
                            }
                        }
                    }
                }
                else if(decoded.name === "L.D") {
                    for(var j in loadBuffer) {
                        if(loadBuffer[j].id === inst) {
                            if(checkReady(loadBuffer[j])) {
                                var tmp = parseInt(j) + 1
                                startExecuting(instructionQueue.instruction[i], inst, "L" + tmp , addBuffer, mulBuffer, loadBuffer, storeBuffer, clock, instructionQueue, latencies)
                                break;
                            }
                        }
                    }
                }
                else if(decoded.name === "S.D") {
                    for(var j in storeBuffer) {
                        if(storeBuffer[j].id === inst) {
                            if(checkReady(storeBuffer[j])) {
                                var tmp = parseInt(j) + 1
                                startExecuting(instructionQueue.instruction[i], inst, "S" + tmp , addBuffer, mulBuffer, loadBuffer, storeBuffer, clock, instructionQueue, latencies)
                                break;
                            }
                        }
                    }
                }
            }
        }
        for(var i = 0; i < instructionQueue.id.length; i++) { //Issuing
            if(instructionQueue.issue[i] === undefined){
                var decoded = decode(instructionQueue.instruction[i], latencies)
                if(decoded.name === "MUL.D" || decoded.name === "DIV.D") {
                    if(checkBuffer(mulBuffer)) {                  
                        issueInstruction(instructionQueue.instruction[i], instructionQueue.id[i], addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, latencies, clock)                       
                    }
                    break;
                }
                else if(decoded.name === "ADD.D" || decoded.name === "SUB.D") {
                    if(checkBuffer(addBuffer)) {
                        issueInstruction(instructionQueue.instruction[i], instructionQueue.id[i], addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, latencies, clock)
                    }
                    break;
                }
                else if(decoded.name === "L.D") {
                    if(checkBuffer(loadBuffer)) {
                        issueInstruction(instructionQueue.instruction[i], instructionQueue.id[i], addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, latencies, clock)
                    }
                    break;
                }
                else if(decoded.name === "S.D") {
                    if(checkBuffer(storeBuffer)) {
                        issueInstruction(instructionQueue.instruction[i], instructionQueue.id[i], addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, latencies, clock)
                    }
                    break;
                }
                
            }    
        }
        console.log(instructionQueue)
}
