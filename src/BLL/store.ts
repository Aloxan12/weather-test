import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {mainReducer} from "./mainReducer";


const rootReducer = combineReducers({
    main: mainReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type RootReduxStateType = ReturnType<typeof rootReducer>
