import React, { useReducer, useEffect } from 'react';
import Header from "./header";
import SideBar from "./sideBar";
import UserForm from "./userForm";
import { IUser} from '../../../sharedTypes';
import { IUserForm } from './userForm';
import {createItem, updateItem} from "../api";

import './main.scss';

enum insuranceActionsTypes {
    SAVE_DATA_START = 'SAVE-DATA-START',
    SAVE_DATA_START_SUCCESS = 'SAVE-DATA-START-SUCCESS',
    SAVE_DATA_START_ERROR = 'SAVE-DATA-START-ERROR',
    UPDATE_INSURANCE_OPTIONS = 'UPDATE_INSURANCE_OPTIONS',
    UPDATE_INSURANCE_OPTIONS_START = 'UPDATE_INSURANCE_OPTIONS_START',
    UPDATE_INSURANCE_OPTIONS_SUCCESS = 'UPDATE_INSURANCE_OPTIONS_SUCCESS',
    UPDATE_INSURANCE_OPTIONS_ERROR = 'UPDATE_INSURANCE_OPTIONS_ERROR',
    UPDATE_DATA_START_SUCCESS = 'SAVE-DATA-START-SUCCESS',
    UPDATE_DATA_START_ERROR = 'UPDATE-DATA-START-ERROR',
    ERROR_MESSAGE = 'ERROR_MESSAGE-DATA-START-ERROR',
}

type Action = {
    type: insuranceActionsTypes;
    payload?: any;
};

const initialState = {
    userName: '',
    userBirthDate: new Date().toISOString() as string,
    userCity: '',
    userVehiclePower: 0,
    userVoucher: 0,
    userPriceMatch: 0,
    userTotalSum: 0,
    insuranceOption: {
        discounts: {
            strongCarSurcharge: 1
        },
        coverages:{}
    },
    configurations: [],
    loading: false,
}

interface extendedUser extends IUser {
    loading: boolean,
    error?: Record<any, any>,
    success?: boolean,
    resetForm?: false
}

const reducer = (state: extendedUser, action: Action): extendedUser => {
    switch (action.type) {
        case insuranceActionsTypes.SAVE_DATA_START:
            return {
                ...state,
                loading: true,
                success: undefined,
                error: undefined
            };
        case insuranceActionsTypes.SAVE_DATA_START_SUCCESS:
            return {
                ...state,
                loading: false,
                error: undefined,
                success: true,
                resetForm: true,
                ...action.payload
            }
        case insuranceActionsTypes.SAVE_DATA_START_ERROR:
            return {
                ...state,
                error: action.payload,
                success: undefined
                
            }
        case insuranceActionsTypes.UPDATE_INSURANCE_OPTIONS_START:
            return {
                ...state,
                loading: true,
                success: undefined,
                resetForm: false,
                error: undefined
            }
        case insuranceActionsTypes.UPDATE_INSURANCE_OPTIONS_SUCCESS:
            const res =  {
                ...state,
                loading: false,
                resetForm: false,
                success: true,
                ...action.payload
            }
            return res
        case insuranceActionsTypes.ERROR_MESSAGE:
            return  {
                ...state,
               error: {message: action.payload},
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
            const res = await createItem({...data,
                configurations:[],
                insuranceOption: {
                discounts: {
                    strongCarSurcharge: 1
                }
            }})
            dispatch({ type: insuranceActionsTypes.SAVE_DATA_START_SUCCESS, payload: res });
        } catch (error) {
            dispatch({ type: insuranceActionsTypes.SAVE_DATA_START_ERROR, payload: {err: error} });
        }
    }
    const updateInsuranceDetails = async (data: Record<string, any> )=> {
        if(!state.userName || !state.userVehiclePower) {
            dispatch({ type: insuranceActionsTypes.ERROR_MESSAGE, payload:'Please, fill the form filed to get the proper calculation'});
            return
        }
        try {
            dispatch({ type: insuranceActionsTypes.UPDATE_INSURANCE_OPTIONS_START});
            const payload =  {
                ...state,
                insuranceOption: {
                    ...state.insuranceOption,
                    ...data
                }
            }
            const { loading,  ...updatedObject } = payload;
            const res = await updateItem(updatedObject)
            dispatch({ type: insuranceActionsTypes.UPDATE_INSURANCE_OPTIONS_SUCCESS, payload: res });
        } catch (error) {
            dispatch({ type: insuranceActionsTypes.UPDATE_DATA_START_ERROR, payload: {err: error} });
        }
    }

    return (
        <div className="page-container">
            <div className='state-wrapper'>
                {state.error && <p className='error hideMe'>{state.error?.message ? state.error?.message: 'Server error, try again'} </p>}
                {state.success && <p className='success hideMe'> Form send success </p>}
            </div>
            <header className="header">
                <Header onChange={updateInsuranceDetails}
                        totalPrice={state.userTotalSum}
                        userVehiclePower={state.userVehiclePower}
                        resetForm={state.resetForm}
                        coverageAmount={state.insuranceOption?.coverages&& Object.keys(state.insuranceOption.coverages).length}
                />
            </header>
            <div className="content">
                <main className="main-content">
                    <UserForm saveUserData={saveUserData} userPriceMatch={state.userPriceMatch} />
                </main>
                <aside className="right-sidebar">
                    <SideBar onChange={updateInsuranceDetails} resetForm={state.resetForm} />
                </aside>
            </div>
            <div className='insurance-configuration'>
                <h2> Insurance configurations</h2>
                {state.configurations.map((elem: any)=>{
                    let res = []
                    for (let i in elem) {
                        res.push(<p>{i}    :    <span>{elem[i]}</span></p>)
                    }
                    res.push(<p>----------------------</p>)
                    return res
                })}
            </div>
        </div>
    )
}
export default Main