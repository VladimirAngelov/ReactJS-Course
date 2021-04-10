const runtimeParser = (runtime) => {
    const hours = runtime / 60
    const minutes = (hours - Math.trunc(hours)) * 60
    return `${Math.trunc(hours)}h : ${Math.ceil(minutes)}m`
}

export default runtimeParser