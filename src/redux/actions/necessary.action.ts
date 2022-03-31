import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import necessaryProvider from "../../providers/necessary/necessary.provider";
import { necessaryTypes } from "../types/necessary.types";

export const getNecessaryAction = () => {
    return (dispatch: Function) => {
        necessaryProvider.getAll()
            .then(res => {
                dispatch({
                    type: necessaryTypes.GET_ALL_NECESSARY,
                    payload: res?.data
                })
            })
            .catch(err => err)
    }
}

export const removeItemAction = (id: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        necessaryProvider
            .remove(id)
            .then((data) => {
                dispatch({
                    type: necessaryTypes.REMOVE_ITEM_NECESSARY,
                    payload: getStore().necessary.necessary.filter((item: any) => item.id !== id)
                })
            })
            .catch((error) => error);
    }
}