import sweetAlert from "../../helpers/alerts/sweetAlert.helper"
import { VolunteerThingsI } from "../../interfaces/volunteer-things/volunteer-things.interface"
import volunteerThingsProvider from "../../providers/volunteer-things/volunteer-things.provider"
import { VolunteerThingsTypes } from "../types/volunteer-things.types"


export const getVolunteerThingsAction = () => {
    return (dispatch: Function) => {
        volunteerThingsProvider.getAll()
            .then(res => {
                dispatch({
                    type: VolunteerThingsTypes.GET_ALL,
                    payload: res?.data
                })
            })
            .catch(err => err)
    }
}

export const addVolunteerThingsAction = (data: VolunteerThingsI) => {
    return (dispatch: Function) => {
        volunteerThingsProvider.create(data)
            .then(res => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch()
            })
            .catch(err => err)
    }
}

export const removeVolunteerThingsAction = (uuid: string) => {
    return async (dispatch: Function, getStore: Function) => {
        const confirm = await sweetAlert.question("Are you sure?", "warning");
        if (!confirm) return;
        volunteerThingsProvider
            .remove(uuid)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Done!', 'success')
                dispatch({
                    type: VolunteerThingsTypes.REMOVE_ITEM,
                    payload: getStore().volunteerThings.volunteerThings.filter((item: any) => item.uuid !== uuid)
                })
            })
            .catch((error) => error);
    }
}

export const updateVolunteerThingsAction = (uuid: string, data: VolunteerThingsI) => {
    return async (dispatch: Function, getStore: Function) => {
        volunteerThingsProvider
            .update(uuid, data)
            .then((res) => {
                if (res.error) return sweetAlert.alert("Error", res?.error?.message, 'error')
                sweetAlert.alert('Success', 'Updated!', 'success')
                dispatch({
                    type: VolunteerThingsTypes.UPDATE_ITEM,
                    payload: getStore().volunteerThings.volunteerThings.map((item: VolunteerThingsI) => item.uuid == uuid ? { ...item, ...data } : item)
                })
            })
            .catch((error) => error);
    }
}