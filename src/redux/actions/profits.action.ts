import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { ProfitsI } from "../../interfaces/profits/profits.interface";
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

export const addProfitsAction = (data: ProfitsI) => {
    return (dispatch: Function) => {
        profitsProvider.create(data)
            .then(res => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                // dispatch()
            })
            .catch(err => err)
    }
}

export const updateProfitsAction = (uuid: string, data: any) => {
    return async (dispatch: Function, getStore: Function) => {
        profitsProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Updated!', 'success')
                dispatch({
                    type: profitsTypes.UPDATE_ITEM_PROFITS,
                    payload: getStore().profits.profits.map((item: ProfitsI) => item.uuid == uuid ? { ...item, ...data } : item)
                })
            })
            .catch((error) => error);
    }
}

export const removeProfitsAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        profitsProvider
            .remove(uuid)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch({
                    type: profitsTypes.DELETE_ITEM_PROFITS,
                    payload: getStore().profits.profits.filter((item: any) => item.uuid !== uuid)
                })
            })
            .catch((error) => error);
    }
}


export const disabledItemAction = (item: any) => {
    return async (dispatch: Function, getStore: Function) => {
        profitsProvider
            .update(item?.uuid, {
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