import React, {useState} from 'react';
import { Button, Grid, TextareaAutosize, TextField } from '@mui/material';
import AddBuffer from "./AddBuffer"
import LoadBuffer from './LoadBuffer';
import Memory from './Memory';
import MulBuffer from "./MulBuffer"
import RegisterFile from './RegisterFile';
import StoreBuffer from './StoreBuffer';
import InstructionQueue from './InstructionQueue';

var func = require("../functions/main");

function Page() {
    const [started, setStarted] = useState(false)
    const [instructions, setInstructions] = useState("")
    const [addLatency, setAddLatency] = useState("")
    const [mulLatency, setMulLatency] = useState("")
    const [loadLatency, setLoadLatency] = useState("")
    const [storeLatency, setStoreLatency] = useState("")
    
    const [clock, setClock] = useState("")
    const [instructionsQueue, setInstructionsQueue] = useState(null)
    const [addBuffer, setAddBuffer] = useState(null)
    const [mulBuffer, setMulBuffer] = useState(null)
    const [loadBuffer, setLoadBuffer] = useState(null)
    const [storeBuffer, setStoreBuffer] = useState(null)
    const [registerFile, setRegisterFile] = useState(null)
    const [memory, setMemory] = useState(null)

    const handleSubmit = () => {
        func.start(instructions.split("\n"), parseInt(addLatency), parseInt(mulLatency), parseInt(loadLatency), parseInt(storeLatency));
        getValues();
        setStarted(true)
    }

    const handleNext = () => {
        func.click();
        getValues();
    }

    const getValues = () => {
        setClock(func.getClock())
        setInstructionsQueue(func.getInstructionQueue())
        setAddBuffer(func.getAddBuffer())
        setMulBuffer(func.getMulBuffer())
        setLoadBuffer(func.getLoadBuffer())
        setStoreBuffer(func.getStoreBuffer())
        setRegisterFile(func.getRegisterFile())
        setMemory(func.getMemory())
    }

  return (
    <div>
        <h1 style={{fontFamily: "roboto", backgroundColor: "#000", color: "#FFFFFF",marginTop: "0"}}>Tomasulo Simulator</h1>
        <Grid container direction="row" alignContent="center">
            <Grid container direction="column">
                <h3>Enter MIPS instructions and Latencies</h3>
                <div style={{alignContent: "center"}}><TextareaAutosize
                disabled={started}
                required
                value={instructions}
                onChange={(e)=> setInstructions(e.target.value)}
                placeholder="MUL.D F0, F1, F2..."
                style={{ width: 500, height: 300 }}
                /></div>
                <br/>
            </Grid>
            <Grid container direction="row" justifyContent="space-evenly">
                <TextField required value={addLatency} onChange={(e)=> setAddLatency(e.target.value)} label="Add/Sub latency" />
                <TextField required value={mulLatency} onChange={(e)=> setMulLatency(e.target.value)} label="Mul/Div latency" />
                <TextField required value={loadLatency} onChange={(e)=> setLoadLatency(e.target.value)} label="Load latency" />
                <TextField required value={storeLatency} onChange={(e)=> setStoreLatency(e.target.value)} label="Store latency" />
            </Grid>
        </Grid>
        <br/>
        <Button style={{ width: 500 }} onClick={handleSubmit} variant="contained" disabled={started}>Submit</Button>
           
      <h2>Current Clock Cycle: {clock}</h2>
      <Button variant="contained" disabled={!started} onClick={handleNext}>Next Cycle</Button>
      {started && <Grid container direction="column" alignContent="center">
        <Grid item>
            <h3>Instruction Queue</h3>
            <InstructionQueue data={instructionsQueue} />
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <h3>Add/Sub Buffer</h3>
            <AddBuffer buffer={addBuffer} />
          </Grid>
          <Grid item>
            <h3>Mul/Div Buffer</h3>
            <MulBuffer buffer={mulBuffer} />
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <h3>Load Buffer</h3>
            <LoadBuffer buffer={loadBuffer}/>
          </Grid>
          <Grid item>
            <h3>Store Buffer</h3>
            <StoreBuffer buffer={storeBuffer}/>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item>
            <h3>Memory</h3>
            <Memory data={memory}/>
          </Grid>
          <Grid item>
            <h3>Register File</h3>
            <RegisterFile regFile={registerFile}/>
          </Grid>
        </Grid>
      </Grid>}
    </div>
  );
}

export default Page;
