import React, {createContext, useContext, useReducer, useEffect} from 'react';
import axios from 'axios';

const initialstate = {
    user: null,
    fetchingUser: true,
    completeToDos: [],
    incompleteToDos: [],
}

// reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const GlobalContext = createContext(initialstate);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, initialstate);

    // action: get current user
    const value = {
        ...state,
    }
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider >
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}
