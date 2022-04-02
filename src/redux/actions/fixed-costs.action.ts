import sweetAlert from "../../helpers/alerts/sweetAlert.helper"
import { FixedCostsI } from "../../interfaces/fixed-costs/fixed-costs.interface"
import fixedCostsProvider from "../../providers/fixed-costs/fixed-costs.provider"
import { fixedCostsTypes } from "../types/fixed-costs.types"

export const getFixedCostsAction = () => {
    return (dispatch: Function) => {
        fixedCostsProvider.getAll()
            .then(res => {
                console.log({ res }, 'action - fixed costs');
                dispatch({
                    type: fixedCostsTypes.GET_ALL,
                    payload: res?.data
                })
            })
            .catch(err => err)

    }
}

export const addFixedCostAction = (data: FixedCostsI) => {
    return (dispatch: Function) => {
        fixedCostsProvider.create(data)
            .then(res => {
                console.log({ res }, "post");
                console.log(res.data);
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch()
            })
            .catch(err => err)
    }
}


export const removeItemAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        fixedCostsProvider
            .remove(uuid)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Deleted!', 'success')
                dispatch({
                    type: fixedCostsTypes.REMOVE_ITEM,
                    payload: getStore().fixedCosts.fixedCosts.filter((item: any) => item.uuid !== uuid)
                })
            })
            .catch((error) => error);
    }
}
export const updateFixedCostsAction = (uuid: string, data: FixedCostsI) => {
    return async (dispatch: Function, getStore: Function) => {
        fixedCostsProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Updated!', 'success')
                dispatch({
                    type: fixedCostsTypes.UPDATE_ITEM,
                    payload: getStore().fixedCosts.fixedCosts.map((item: any) => item.uuid == uuid ? { ...item, ...data } : item)
                })
            })
            .catch((error) => error);
    }
}


export const disabledItemAction = (item: FixedCostsI) => {
    return async (dispatch: Function, getStore: Function) => {
        fixedCostsProvider
            .update(item?.uuid || '', {
                active: !item?.active,
            })
            .then((res) => {
                if (res.error) return sweetAlert.toast("Error", res?.error?.message, 'error')
                sweetAlert.toast('Success', 'Changed!', 'success')
                dispatch({
                    type: fixedCostsTypes.DISABLE_ITEM,
                    payload: getStore().fixedCosts.fixedCosts.map((fc: any) => {
                        if (fc.uuid === item.uuid) fc.active = !item.active
                        return fc
                    })
                })
            })
            .catch((error) => error);
    }
}