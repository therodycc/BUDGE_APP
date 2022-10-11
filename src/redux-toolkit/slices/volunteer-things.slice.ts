import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { VolunteerThingsI } from '../../interfaces/volunteer-things/volunteer-things.interface'

export interface VolunteerThingsStateI {
    result: VolunteerThingsI[] | null
}

const volunteerThingsState: VolunteerThingsStateI = {
    result: null,
}

export const volunteerThingsSlice = createSlice({
    name: 'volunteer-things',
    initialState: volunteerThingsState,
    reducers: {
        addVolunteerThings: (state: VolunteerThingsStateI, action: PayloadAction<{ result: VolunteerThingsI[] }>) => {
            state.result = action.payload.result
        },
        addNewVolunteerThing: (state: VolunteerThingsStateI, action: PayloadAction<{ volunteerThing: VolunteerThingsI }>) => {
            state.result && (state.result = [action.payload.volunteerThing, ...state.result])
        },
        updateVolunteerThing: (state: VolunteerThingsStateI, action: PayloadAction<{ volunteerThing: VolunteerThingsI }>) => {
            state.result && (state.result = state.result.map((item: VolunteerThingsI) =>
                item.uuid == action.payload.volunteerThing.uuid ? {
                    ...item,
                    ...action.payload.volunteerThing
                } : item))
        },
        removeVolunteerThing: (state: VolunteerThingsStateI, action: PayloadAction<{ uuid: string }>) => {
            state.result && (state.result = state.result.filter((item: VolunteerThingsI) => item.uuid != action.payload.uuid))
        }
    },
})

export const { addVolunteerThings, addNewVolunteerThing, updateVolunteerThing, removeVolunteerThing } = volunteerThingsSlice.actions

export default volunteerThingsSlice.reducer