import React, { useReducer } from 'react';
import Header from "./header";
import SideBar from "./sideBar";
import UserForm from "./userForm";
import { IUser} from '../../../sharedTypes';
import { IUserForm } from './userForm';
import {createItem} from "../api";

enum insuranceActionsTypes {
    SAVE_DATA_START = 'SAVE-DATA-START',
    SAVE_DATA_START_SUCCESS = 'SAVE-DATA-START-SUCCESS',
    SAVE_DATA_START_ERROR = 'SAVE-DATA-START-ERROR',
    UPDATE_DATA_START = 'UPDATE-DATA-START',
    UPDATE_DATA_START_SUCCESS = 'SAVE-DATA-START-SUCCESS',
    UPDATE_DATA_START_ERROR = 'UPDATE-DATA-START-ERROR',
}

interface insuranceActions {
    type: insuranceActionsTypes;
    payload?: Record<any, any>;
}
const initialState = {
    userName: '',
    userBirthDate: new Date(),
    userCity: '',
    userVehiclePower: 0,
    userVoucher: 0,
    userPriceMatch: 0,
    userTotalSum: 0,
    insuranceOption: {},
    configurations: [],
    loading: false
}
interface extendedUser extends IUser {
    loading: boolean
}

const reducer = (state: extendedUser, action: insuranceActions): extendedUser => {
    switch (action.type) {
        case insuranceActionsTypes.SAVE_DATA_START:
            return {
                ...state,
                loading: true
            };
        case insuranceActionsTypes.SAVE_DATA_START_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.payload
            }
        default :
            return state
    }
}

const Main = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState);

    const saveUserData = async (data:IUserForm ) => {
        try {
            dispatch({ type: insuranceActionsTypes.SAVE_DATA_START });
            const res = await createItem(data)
            dispatch({ type: insuranceActionsTypes.SAVE_DATA_START_SUCCESS, payload: res });
        } catch (error) {
            dispatch({ type: insuranceActionsTypes.SAVE_DATA_START_ERROR, payload: {err: error} });
        }
    }
    return (
        <>
            <Header/>
            <SideBar/>
            <UserForm saveUserData={saveUserData} userPriceMatch={state.userPriceMatch} />
        </>
    )
}
export default Main