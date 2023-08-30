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
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                fetchingUser: false,
            };
        case "SET_COMPLETE_TODOS":
            return {
                ...state,
                completeToDos: action.payload,
            };
        case "SET_INCOMPLETE_TODOS":
            return {
                ...state,
                incompleteToDos: action.payload,
            };
        case "RESET_USER":
            return {
                ...state,
                completeToDos: [],
                incomplete: [],
                fetchingUser: false,
            }
        default:
            return state;
    }
}

export const GlobalContext = createContext(initialstate);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, initialstate);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        try {
            const res = await axios.get("api/auth/current");
            if (res.data) {
                const toDosRes = await axios.post("api/todos/current")
                if (toDosRes.data) {
                    dispatch({type: "SET_USER", payload: res.data});
                    dispatch({type: "SET_COMPLETE_TODOS", payload: toDosRes.data.complete});
                    dispatch({type: "SET_INCOMPLETE_TODOS", payload: toDosRes.data.incomplete});
                }
            } else {
                dispatch({type: "RESET_USER"});
            }
        } catch(err) {
            dispatch({type: "RESET_USER"});
            console.log(err);
        }
    }

    const Logout = async () => {
        try {
            await axios.put("/api/auth/logout");
            dispatch({type: "RESET_USER"});
        } catch(err) {
            console.log(err);
            dispatch({type: "RESET_USER"});
        }
    }
    // action: get current user
    const value = {
        ...state,
        getCurrentUser,
        Logout,
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
