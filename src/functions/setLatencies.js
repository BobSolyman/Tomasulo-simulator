function setLatencies(add, mul, load, store){
    return {
        addLatency: add,
        mulLatency: mul,
        loadLatency: load,
        storeLatency: store
    }
}

module.exports = setLatencies