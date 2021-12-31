function init() {
    console.log("init")
    return [{instruction: [], issue: [], execute: [], writeResult: []}, //instruction Queue
            {A1: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: "", cyclesRemaining: ""}, 
                A2: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: "", cyclesRemaining: ""},
                A3: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: "", cyclesRemaining: ""}}, //add/sub reservation
            {M1: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: "", cyclesRemaining: ""}, 
                M2: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: "", cyclesRemaining: ""}, 
                M3: {op:"", Vj:"", Vk:"", Qj:"", Qk:"", busy: "", cyclesRemaining: ""}}, //mul/diV reservation
            {L1: {address: "", busy: "", cyclesRemaining: ""},
                L2: {address: "", busy: "", cyclesRemaining: ""}}, //load reservation
            {S1: {address: "", V: "", Q: "", busy: "", cyclesRemaining: ""}, 
                S2: {address: "", V: "", Q: "", busy: "", cyclesRemaining: ""}}, // store reservation
            {F0: {Q: "", value: ""},
                F1: {Q: "", value: ""},
                F2: {Q: "", value: ""},
                F3: {Q: "", value: ""},
                F4: {Q: "", value: ""},
                F5: {Q: "", value: ""},
                F6: {Q: "", value: ""},
                F7: {Q: "", value: ""},
                F8: {Q: "", value: ""},
                F9: {Q: "", value: ""},
                F10: {Q: "", value: ""},
                F11: {Q: "", value: ""},
                F12: {Q: "", value: ""},
                F13: {Q: "", value: ""},
                F14: {Q: "", value: ""},
                F15: {Q: "", value: ""},
                F16: {Q: "", value: ""},
                F17: {Q: "", value: ""},
                F18: {Q: "", value: ""},
                F19: {Q: "", value: ""},
                F20: {Q: "", value: ""},
                F21: {Q: "", value: ""},
                F22: {Q: "", value: ""},
                F23: {Q: "", value: ""},
                F24: {Q: "", value: ""},
                F25: {Q: "", value: ""},
                F26: {Q: "", value: ""},
                F27: {Q: "", value: ""},
                F28: {Q: "", value: ""},
                F29: {Q: "", value: ""},
                F30: {Q: "", value: ""},
                F31: {Q: "", value: ""},}, //register file
            {data: []} //memory
    ]
}

module.exports = init;