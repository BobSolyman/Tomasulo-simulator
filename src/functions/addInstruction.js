function addInstruction(instruction, instructionQueue) {
    var counter = 0;
    for (let i in instructionQueue.id) {
        counter++
    }
    instructionQueue.id.push(counter)
    instructionQueue.instruction.push(instruction)
}

module.exports = addInstruction