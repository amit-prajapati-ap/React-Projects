import { createSlice, nanoid } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    pastes: localStorage.getItem("pastes")
        ? JSON.parse(localStorage.getItem("pastes"))
        : []
}

const AddToPastes = (state, action) => {
    const paste = action.payload
    if(paste.title && paste.content){
        state.pastes.push(paste)
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Created Successfully")
    }
}

const UpdateToPastes = (state, action) => {
    const paste = action.payload
    const index = state.pastes.findIndex(item => item._id === paste._id)

    if (index >= 0) {
        state.pastes[index] = (paste)
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Updated Successfully")
    }
}

const ResetAllPastes = (state) => {
    state.pastes = []
    localStorage.removeItem("pastes")
    toast.success("All Paste Removed")
}

const RemoveFromPastes = (state, action) => {
    const pasteId = action.payload
    const index = state.pastes.findIndex(item => item._id === pasteId)

    if (index >= 0) {
        state.pastes.splice(index, 1)

        localStorage.setItem("pastes", JSON.stringify(state.pastes))

        toast.success("Paste Deleted")
    }
}

export const PasteSlice = createSlice({
    name: 'paste',
    initialState,
    reducers: {
        addtoPaste: AddToPastes,
        updateToPastes: UpdateToPastes,
        resetAllPastes: ResetAllPastes,
        removeFromPastes: RemoveFromPastes
    }
})

export const { addtoPaste, updateToPastes, removeFromPastes, resetAllPastes } = PasteSlice.actions

export default PasteSlice.reducer