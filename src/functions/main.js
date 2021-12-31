const Init = require("./init")
const setLatencies = require("./setLatencies")
const issueInstruction = require('./issueInstruction')
const startExecuting = require("./startExecuting")
const checkReady = require("./checkReady")
const addInstruction = require("./addInstruction")
var init = Init()

var instructionQueue = init[0]

var A1 = init[1].A1
var A2 = init[1].A2
var A3 = init[1].A3
var addBuffer = [A1, A2, A3]

var M1 = init[2].M1
var M2 = init[2].M2
var M3 = init[2].M3
var mulBuffer = [M1, M2, M3]

var L1 = init[3].L1
var L2 = init[3].L2
var loadBuffer = [L1, L2]

var S1 = init[4].S1
var S2 = init[4].S2
var storeBuffer = [S1, S2]

var registerFile = init[5] //access register using registerFile.Fx
var memory = init[6].data //access memory address using memory[x]

var latencies = setLatencies(2,3,1,1)

