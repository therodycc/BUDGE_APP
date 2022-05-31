import { FC, useReducer } from "react";
import { UIContext } from "./uiContext";
import { uiReducer } from "./uiReducer";

export interface UIStateI {
    isMenuSquareOpen: boolean;
}
const INITIAL_STATE: UIStateI = {
    isMenuSquareOpen: false,
}

export const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, INITIAL_STATE);

    const handleIsMenuSquare = () => {
        dispatch({ type: "UI_MENU_SQUARE_TOGGLE" })
    }

    return <UIContext.Provider value={{
        ...state,
        handleIsMenuSquare
    }}>
        {children}
    </UIContext.Provider>
}