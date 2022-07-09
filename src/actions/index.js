export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroCreate = (hero) => {
    return{
        type:'CREATE_PERSON',
        payload:hero
    }
}
export const heroRemove = (id) => {
    return{
        type:'REMOVE_PERSON',
        payload:id
    }
}