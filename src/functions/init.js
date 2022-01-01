function init() {
    console.log("init")
    var regFile = []
    for(var i=0; i<32; i++) {
        regFile.push({Q: "", value: ""})
    }
    return [{id: [], instruction: [], issue: [], execute: [], writeResult: []}, //instruction Queue
            {A1: {id: "", op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}, 
                A2: {id: "", op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""},
                A3: {id: "", op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}}, //add/sub reservation
            {M1: {id: "", op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}, 
                M2: {id: "", op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}, 
                M3: {id: "", op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: 0, cyclesRemaining: ""}}, //mul/diV reservation
            {L1: {id: "", address: "", busy: 0, cyclesRemaining: ""},
                L2: {id: "", address: "", busy: 0, cyclesRemaining: ""}}, //load reservation
            {S1: {id: "", address: "", V: "", Q: "", busy: 0, cyclesRemaining: ""}, 
                S2: {id: "", address: "", V: "", Q: "", busy: 0, cyclesRemaining: ""}}, // store reservation
            regFile, //register file
            {data: []} //memory
    ]
}
module.exports = init;