export  const loadState = () => {
    try {
        const serializesState = localStorage.getItem('state')
        if (serializesState === null) {
            return undefined;
        }
        return JSON.parse(serializesState);
    } catch (err) {
        return undefined;
    }
}
export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState)
    } catch (err) {

    }
}