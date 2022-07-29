import { UIStateI } from "./uiProvider";

type UIActionType =
    | { type: 'UI_MENU_SQUARE_TOGGLE'; }
    | { type: 'UI_ASIDE_MENU_TOGGLE'; }

export const uiReducer = (state: UIStateI, action: UIActionType): UIStateI => {
    switch (action.type) {
        case 'UI_MENU_SQUARE_TOGGLE':
            return {
                ...state,
                isMenuSquareOpen: !state.isMenuSquareOpen
            };
        case 'UI_ASIDE_MENU_TOGGLE':
            return {
                ...state,
                showAsideBar: !state.showAsideBar
            };

        default:
            return state
    }
}