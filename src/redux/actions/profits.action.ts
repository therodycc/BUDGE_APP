import profitsProvider from "../../providers/profits/profits.provider";
import { profitsTypes } from "../types/profits.types";

export const getProfitsAction = () => {
    return (dispatch: Function) => {
        profitsProvider.getAll()
            .then(res => {
                dispatch({
                    type: profitsTypes.GET_ALL_PROFITS,
                    payload: res?.data
                })
            })
            .catch(err => err)
    }
}


export const disabledItemAction = (item: any) => {
    return async (dispatch: Function, getStore: Function) => {
        profitsProvider
            .update(item?.id, {
                active: !item?.active,
            })
            .then((res) => {
                dispatch({
                    type: profitsTypes.DISABLE_ITEM_PROFITS,
                    payload: getStore()?.profits?.profits?.map((fc: any) => {
                        if (fc.id === item.id) fc.active = !item.active
                        return fc
                    })
                })
            })
            .catch((error) => error);
    }
}