import React, { useReducer } from 'react';
import Header from "./header";
import SideBar from "./sideBar";
import UserForm from "./userForm";
import {Iconfigurations, Icoverages, Idiscounts, IUser} from '../../../sharedTypes';

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
    payload: Record<any, any>;
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
}

const reducer = (state: IUser, action: insuranceActions) => {
    if (action.type === 'SAVE-DATA-START-SUCCESS') {
        return {
            ...state
        };
    }
    throw Error('Unknown action.');
}
const Main = ()=> {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <Header/>
            <SideBar/>
            <UserForm/>
        </>

    )
}
export default Main