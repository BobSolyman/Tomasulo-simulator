const decode = require("./decode");

function issueInstruction(instruction, id, addBuffer, mulBuffer, loadBuffer, storeBuffer, registerFile, instructionQueue, latencies, cycle) {
    let decoded = decode(instruction, latencies)

    if (decoded.name === "ADD.D" || decoded.name === "SUB.D") {
        for (let i in addBuffer) {
            if (addBuffer[i].busy === 0) {
                addBuffer[i].op = decoded.name
                addBuffer[i].busy = 1
                let source1 = checkRegister(decoded.source1, registerFile)
                if (source1.type === "value")
                    addBuffer[i].Vj = source1.value
                else
                    addBuffer[i].Qj = source1.value

                let source2 = checkRegister(decoded.source2, registerFile)
                if (source2.type === "value")
                    addBuffer[i].Vk = source2.value
                else
                    addBuffer[i].Qk = source2.value

                let dest = parseInt(decoded.destination.substring(1), 10)
                registerFile[dest].Q = "A" + (parseInt(i) + 1)
                instructionQueue.issue[id] = cycle;
                return true;
            }

        }

    } else if (decoded.name === "MUL.D" || decoded.name === "DIV.D") {
        for (let i in mulBuffer) {
            if (mulBuffer[i].busy === 0) {
                mulBuffer[i].op = decoded.name
                mulBuffer[i].busy = 1
                let source1 = checkRegister(decoded.source1, registerFile)
                if (source1.type === "value")
                    mulBuffer[i].Vj = source1.value
                else
                    mulBuffer[i].Qj = source1.value

                let source2 = checkRegister(decoded.source2, registerFile)
                if (source2.type === "value")
                    mulBuffer[i].Vk = source2.value
                else
                    mulBuffer[i].Qk = source2.value

                let dest = parseInt(decoded.destination.substring(1), 10)
                registerFile[dest].Q = "M" + (parseInt(i) + 1)
                instructionQueue.issue[id] = cycle;
                return true;
            }

        }

    } else if (decoded.name === "L.D") {
        for (let i in loadBuffer) {
            if (loadBuffer[i].busy === 0) {
                loadBuffer[i].op = decoded.name
                loadBuffer[i].busy = 1
                loadBuffer[i].address = decoded.source1

                let dest = parseInt(decoded.destination.substring(1), 10)
                registerFile[dest].Q = "L" + (parseInt(i) + 1)
                instructionQueue.issue[id] = cycle;
                return true;
            }

        }

    } else if (decoded.name === "S.D") {
        for (let i in storeBuffer) {
            if (storeBuffer[i].busy === 0) {
                storeBuffer[i].op = decoded.name
                storeBuffer[i].busy = 1

                let source1 = checkRegister(decoded.source1, registerFile)
                if (source1.type === "value")
                    storeBuffer[i].V = source1.value
                else
                    storeBuffer[i].Q = source1.value

                storeBuffer[i].address = decoded.destination
                instructionQueue.issue[id] = cycle;
                return true;
            }

        }

    }
    return false;
}

function checkRegister(registerName, registerFile) {
    for (let i in registerFile) {
        if ("F" + i === registerName) {
            return registerFile[i].Q === "" ? {
                value: registerFile[i].value,
                type: "value"
            } : {
                value: registerFile[i].Q,
                type: "station"
            }
        }
    }
}

module.exports = issueInstruction;