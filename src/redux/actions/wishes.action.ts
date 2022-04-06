
import sweetAlert from "../../helpers/alerts/sweetAlert.helper"
import { WishesI } from "../../interfaces/wishes/wishes.interface"
import wishesProvider from "../../providers/wishes/wishes.provider"
import { WishesTypes } from "../types/wishes.types"


export const getWishesAction = () => {
    return (dispatch: Function) => {
        wishesProvider.getAll()
            .then(res => {
                dispatch({
                    type: WishesTypes.GET_ALL,
                    payload: res?.data
                })
            })
            .catch(err => err)
    }
}

export const addWishesAction = (data: WishesI) => {
    return (dispatch: Function) => {
        wishesProvider.create(data)
            .then(res => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch()
            })
            .catch(err => err)
    }
}

export const removeWishesAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        wishesProvider
            .remove(uuid)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch({
                    type: WishesTypes.REMOVE_ITEM,
                    payload: getStore().Wishes.Wishes.filter((item: any) => item.uuid !== uuid)
                })
            })
            .catch((error) => error);
    }
}

export const updateWishesAction = (uuid: string, data: WishesI) => {
    return async (dispatch: Function, getStore: Function) => {
        wishesProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Updated!', 'success')
                dispatch({
                    type: WishesTypes.UPDATE_ITEM,
                    payload: getStore().wishes.wishes.map((item: WishesI) => item.uuid == uuid ? { ...item, ...data } : item)
                })
            })
            .catch((error) => error);
    }
}
