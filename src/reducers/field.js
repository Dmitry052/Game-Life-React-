const initialState = {
    showModal: true,
    paramGrid: {
        btn: 'none',
        editStatus: true,
        btnStart: false,
        stop: false,
        count: 0,
        valueN: 0,
        valueM: 0,
        map: [],
        oldMap: [],
        mapNeighbors: []
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
        state.showModal = false;
        state.paramGrid.btn = '';
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
    if (action.type === 'SET_CELL_VALUE') {
        state.paramGrid.map[action.data] = state.paramGrid.map[action.data] === 0 ? 1 : 0;
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    if (action.type === 'EDIT_STATUS') {
        state.paramGrid.stop = false;
        state.paramGrid.count = 0;

        state.paramGrid.editStatus = !state.paramGrid.editStatus;
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    if (action.type === 'NEXT_GENERATION') {
        // счётчик поколений
        state.paramGrid.count = state.paramGrid.count + 1;
        let n = state.paramGrid.valueN / 20;
        let m = state.paramGrid.valueM / 20;

        // сохраняем старые значения
        for (let i = 0; i < state.paramGrid.map.length; i++) {
            state.paramGrid.oldMap[i] = state.paramGrid.map[i];
        }
        // Перебираем текущий массив
        for (let i = 0; i < state.paramGrid.map.length; i++) {
            let topC = (() => {
                if (i - n < 0 && i !== n) {
                    return (n * m) + (i - n);
                }
                else {
                    return i - n;
                }
            })();
            state.paramGrid.mapNeighbors.push(topC);
            // ------------
            let midL = (() => {
                let start = (~~(i / n) * n);
                let end = (~~(i / n) * n) + n;
                if (i > start && i < end) {
                    return i - 1;
                } else {
                    if (i === start) { return end - 1 }
                }
            })();
            state.paramGrid.mapNeighbors.push(midL);
            let midR = (() => {
                if ((i + 1) % n === 0) {
                    return (i + 1) - n;
                } else {
                    return i + 1;
                }
            })();
            state.paramGrid.mapNeighbors.push(midR);
            // ------------
            let botC = (() => {
                if (i + n >= (n * m)) {
                    return (i + n) - (n * m);
                }
                else {
                    return i + n;
                }
            })();
            state.paramGrid.mapNeighbors.push(botC);
            // ------------
            let topL = (() => {
                let start = (~~(topC / n) * n);
                let end = (~~(topC / n) * n) + n - 1;

                if (topC === start) { return end }
                else {
                    return topC - 1;
                }
            })();
            state.paramGrid.mapNeighbors.push(topL);
            let topR = (() => {
                let start = (~~(topC / n) * n);
                let end = (~~(topC / n) * n) + n - 1;

                if (topC === end) { return start }
                else {
                    return topC + 1;
                }
            })();
            state.paramGrid.mapNeighbors.push(topR);
            let botL = (() => {
                let start = (~~(botC / n) * n);
                let end = (~~(botC / n) * n) + n - 1;

                if (botC === start) { return end }
                else {
                    return botC - 1;
                }
            })();
            state.paramGrid.mapNeighbors.push(botL);
            let botR = (() => {
                let start = (~~(botC / n) * n);
                let end = (~~(botC / n) * n) + n - 1;

                if (botC === end) { return start }
                else {
                    return botC + 1;
                }
            })();
            state.paramGrid.mapNeighbors.push(botR);
            // console.log("Соседи - i", i, ":", topL, topC, topR, "|", midL, midR, "|", botL, botC, botR);
            let schet = 0;
            for (let j = 0; j < state.paramGrid.mapNeighbors.length; j++) {
                let pos = state.paramGrid.mapNeighbors[j];
                state.paramGrid.map[pos] === 1 ? schet++ : schet;
            }
            if (state.paramGrid.map[i] === 0 && schet === 3) {
                state.paramGrid.map[i] = 1;
            } else if (state.paramGrid.map[i] === 1 && schet >= 2 && schet < 4) {
                state.paramGrid.map[i] = 1;
            } else if (state.paramGrid.map[i] === 1 && (schet > 3 || schet < 2)) {
                state.paramGrid.map[i] = 0;
            }
            // чистим массив с индексами соседей
            state.paramGrid.mapNeighbors = [];
        }
        // Проверка на конца игры
        let countLive = 0
        for (let m = 0; m < state.paramGrid.map.length; m++) {
            state.paramGrid.map[m] === 1 ? countLive++ : countLive;
        }
        // Если все мёртвые
        if (countLive === 0) { state.paramGrid.stop = !state.paramGrid.stop; }
        // // Если новое поколение повторяет предыдущее 
        let countRepeat = 0
        for (let m = 0; m < state.paramGrid.map.length; m++) {
            state.paramGrid.map[m] !== state.paramGrid.oldMap[m] ? countRepeat++ : "";
        }
        if (countRepeat === 0) { state.paramGrid.stop = !state.paramGrid.stop; }
        return {
            showModal: state.showModal,
            paramGrid: state.paramGrid
        }
    }
    return state;
}