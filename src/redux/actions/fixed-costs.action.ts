import sweetAlert from "../../helpers/sweetAlert.helper"
import fixedCostsProvider from "../../providers/fixed-costs/fixed-costs.provider"
import { fixedCostsTypes } from "../types/fixed-costs.types"

export const getFixedCostsAction = () => {
    return (dispatch: Function) => {
        fixedCostsProvider.getAll()
            .then(res => {
                dispatch({
                    type: fixedCostsTypes.GET_ALL,
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
        fixedCostsProvider
            .remove(id)
            .then((data) => {
                dispatch({
                    type: fixedCostsTypes.REMOVE_ITEM,
                    payload: getStore().fixedCosts.fixedCosts.filter((item: any) => item.id !== id)
                })
            })
            .catch((error) => error);
    }
}


export const disabledItemAction = (item: any) => {
    return async (dispatch: Function, getStore: Function) => {
        fixedCostsProvider
            .update(item?.id, {
                active: !item?.active,
            })
            .then((res) => {
                dispatch({
                    type: fixedCostsTypes.DISABLE_ITEM,
                    payload: getStore().fixedCosts.fixedCosts.map((fc: any) => {
                        if (fc.id === item.id) fc.active = !item.active
                        return fc
                    })
                })
            })
            .catch((error) => error);
    }
}