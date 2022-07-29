import { FC, useReducer } from "react";
import { UIContext } from "./uiContext";
import { uiReducer } from "./uiReducer";

export interface UIStateI {
    isMenuSquareOpen: boolean;
    showAsideBar: boolean;
}
const INITIAL_STATE: UIStateI = {
    isMenuSquareOpen: false,
    showAsideBar: true
}

export const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

    const handleIsMenuSquare = () => {
        dispatch({ type: "UI_MENU_SQUARE_TOGGLE" })
    }

    const handleShowAsideBar = () => {
        dispatch({ type: "UI_ASIDE_MENU_TOGGLE" })
    }


    return <UIContext.Provider value={{
        ...state,
        handleIsMenuSquare,
        handleShowAsideBar
    }}>
        {children}
    </UIContext.Provider>
}