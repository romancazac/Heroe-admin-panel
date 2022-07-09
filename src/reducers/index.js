const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'CREATE_PERSON':
            let newCreateList = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newCreateList
            }
        case 'REMOVE_PERSON':
            let filterCreateList = state.heroes.filter((obj) => obj.id !== action.payload)
            return {
                ...state,
                heroes: filterCreateList
            }
        case 'FILTER_FETCHING' :
            return {
                ...state,
                filters:action.payload
            }    

        default: return state
    }
}

export default reducer;