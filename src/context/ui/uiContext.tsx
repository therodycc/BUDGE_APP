import { createContext } from "react";

interface UIContextI {
    isMenuSquareOpen: boolean;
    handleIsMenuSquare: () => void;
}

export const UIContext = createContext({} as UIContextI)