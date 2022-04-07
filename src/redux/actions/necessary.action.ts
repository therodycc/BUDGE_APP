import sweetAlert from "../../helpers/alerts/sweetAlert.helper";
import { NecessaryI } from "../../interfaces/necessary/necessary.interface";
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

export const addNecessaryAction = (data: NecessaryI) => {
    return (dispatch: Function, getStore: Function) => {
        necessaryProvider.create(data)
            .then(res => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch({
                    type: necessaryTypes.ADD_ITEM_NECESSARY,
                    payload: [res?.data?.response].concat(getStore().necessary.necessary)
                })
            })
            .catch(err => err)
    }
}

export const removeNecessaryAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        necessaryProvider
            .remove(uuid)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch({
                    type: necessaryTypes.REMOVE_ITEM_NECESSARY,
                    payload: getStore().necessary.necessary.filter((item: any) => item.uuid !== uuid)
                })
            })
            .catch((error) => error);
    }
}

export const updateNecessaryAction = (uuid: string, data: NecessaryI) => {
    return async (dispatch: Function, getStore: Function) => {
        necessaryProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Updated!', 'success')
                dispatch({
                    type: necessaryTypes.UPDATE_ITEM_NECESSARY,
                    payload: getStore().necessary.necessary.map((item: NecessaryI) => item.uuid == uuid ? { ...item, ...data } : item)
                })
            })
            .catch((error) => error);
    }
}