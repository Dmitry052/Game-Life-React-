const initialState = {
    showModal: true,
    showField: 'none',
    paramGrid: {
        btn: 'none',
        btnStart: false,
        btnStop: false,
        btnClear: false,
        btnNewFiled: false,

        oldGeneration: [],

        countGeneration: 0,
        stop: false,

        valueN: 0,
        valueM: 0,
        field: []
    }
}
export default function fintEvents(state = initialState, action) {
    if (action.type === 'SET_VALUE_N') {
        state.paramGrid.valueN = action.data;
        return {
            showModal: state.showModal,
            showField: state.showField,
            paramGrid: state.paramGrid,
        }
    }
    if (action.type === 'SET_VALUE_M') {
        state.paramGrid.valueM = action.data;
        return {
            showModal: state.showModal,
            showField: state.showField,
            paramGrid: state.paramGrid,
        }
    }
    if (action.type === 'SET_CELL') {
        state.paramGrid.field[action.data.n][action.data.m] === 'black' ? state.paramGrid.field[action.data.n][action.data.m] = 'white' : state.paramGrid.field[action.data.n][action.data.m] = 'black';
        return {
            showModal: state.showModal,
            showField: state.showField,
            paramGrid: state.paramGrid,
        }
    }
    if (action.type === 'CREATE_FIELD') {
        state.paramGrid.btn = '';
        state.showModal = false;
        state.showField = '';
        for (let i = 0; i < state.paramGrid.valueN; i++) {
            state.paramGrid.field[i] = [];
            for (let j = 0; j < state.paramGrid.valueM; j++) {
                state.paramGrid.field[i][j] = 'white';
            }
        }
        return {
            showModal: state.showModal,
            showField: state.showField,
            paramGrid: state.paramGrid,
        }
    }
    if (action.type === 'NEXT_GENERATION') {
        state.paramGrid.countGeneration++;
        state.paramGrid.stop = false;
        
        console.log("old-0", state.paramGrid.oldGeneration);
        state.paramGrid.oldGeneration = state.paramGrid.field.slice();
        console.log("old-1", state.paramGrid.oldGeneration);
        
        let allLive = 0;
        for (let i = 0; i < state.paramGrid.field.length; i++) {
            for (let j = 0; j < state.paramGrid.field[i].length; j++) {
                // Счетаем живых
                state.paramGrid.field[i][j] === "black" ? allLive++ : '';
                // Проверяем соседей
                let live = 0;
                for (let i1 = i - 1; i1 <= i + 1; i1++) {
                    for (let j1 = j - 1; j1 <= j + 1; j1++) {
                        if (i1 !== i || j1 !== j) {
                            if (i1 >= 0 && i1 <= state.paramGrid.valueN - 1 && j1 >= 0 && j1 <= state.paramGrid.valueM - 1) {
                                // console.log("точка", i, ":", j, "!", "сосед", i1, ":", j1);
                                state.paramGrid.field[i1][j1] === "black" ? live++ : live;
                            }
                        }
                    }
                }
                if (state.paramGrid.field[i][j] === 'white' && live === 3) { state.paramGrid.field[i][j] = 'black' }
                else if (state.paramGrid.field[i][j] === 'black' && (live === 2 || live === 3)) { state.paramGrid.field[i][j] = 'black' }
                else { state.paramGrid.field[i][j] = 'white' }


            }
        }
        // console.log("живых", allLive);
        // console.log("old", oldGeneration);
        console.log("new", state.paramGrid.field);
        // if (allLive === 0) { state.paramGrid.countGeneration = 0; state.paramGrid.stop = true; }
        let copy = false;
        // for (let i = 0; i < oldGeneration.length; i++) {
        //     for (let j = 0; j < oldGeneration[i].length; j++) {
        //         if(state.paramGrid.field[i][j] !== oldGeneration[i][j]){
        //             copy = true;
        //             break;
        //         }
        //     }
        //     if(copy){break};
        // }
        console.log("copy", copy);
        // state.paramGrid.stop = true;
        return {
            showModal: state.showModal,
            showField: state.showField,
            paramGrid: state.paramGrid,
        }
    }
    return state;
}