import { createContext } from "react";

interface UIContextI {
    isMenuSquareOpen: boolean;
    showAsideBar: boolean
    handleIsMenuSquare: () => void;
    handleShowAsideBar: () => void;
}

export const UIContext = createContext({} as UIContextI)