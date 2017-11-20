const initialState = {
    showModal: true,
    paramGrid: {
        valueN: 0,
        valueM: 0,
        map: []
    }

}

export default function fintEvents(state = initialState, action) {
    if (action.type === 'FIND_EVENT') {
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    if (action.type === 'SHOW_MODAL') {
        state.showModal = !state.showModal;
        let len = (state.paramGrid.valueN / 20) * (state.paramGrid.valueM / 20)
        for (let i = 0; i < (len); i++) {
            state.paramGrid.map[i] = 0;
        }
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    if (action.type === 'SET_VALUE_N') {
        state.paramGrid.valueN = action.data;
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    if (action.type === 'SET_VALUE_M') {
        state.paramGrid.valueM = action.data;
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    return state;
}