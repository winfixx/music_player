import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InitialState {
    isOpen: boolean,
    errorMessage: string
    isError: boolean
    textButton: string
    titleModal: string
    typeButton: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    mainText: React.ReactNode
    approval: boolean
}

const initialState: InitialState = {
    isOpen: false,
    errorMessage: '',
    isError: false,
    textButton: '',
    titleModal: '',
    typeButton: 'button',
    mainText: '',
    approval: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        onOpenModal: (state) => {
            state.isOpen = true
            state.approval = false
        },
        onCloseModal: (state) => {
            state.isOpen = false
            state.isError = false
            state.approval = true
        },
        addErrorMessage: (state, action: PayloadAction<{ message: string }>) => {
            state.isError = true
            state.errorMessage = action.payload.message
            state.textButton = 'Хорошо'
            state.titleModal = 'Упс... Ошибка'
        },
        addMessage: (state, action: PayloadAction<{ message: React.ReactNode, textButton: string, titleModal: string }>) => {
            state.mainText = action.payload.message
            state.textButton = action.payload.textButton
            state.titleModal = action.payload.titleModal
        }
    }
})

export const { actions: modalAction, reducer: modalReducer } = modalSlice