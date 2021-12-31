function init() {
    console.log("init")
    var regFile = []
    for(var i=0; i<32; i++) {
        regFile.push({Q: "A2", value: ""})
    }
    return [{id: [], instruction: [], issue: [], execute: [], writeResult: []}, //instruction Queue
            {A1: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}, 
                A2: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""},
                A3: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}}, //add/sub reservation
            {M1: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}, 
                M2: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}, 
                M3: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}}, //mul/diV reservation
            {L1: {address: "", busy: 0, cyclesRemaining: ""},
                L2: {address: "", busy: 0, cyclesRemaining: ""}}, //load reservation
            {S1: {address: "", V: "", Q: "", busy: 0, cyclesRemaining: ""}, 
                S2: {address: "", V: "", Q: "", busy: 0, cyclesRemaining: ""}}, // store reservation
            regFile, //register file
            {data: []} //memory
    ]
}
module.exports = init;