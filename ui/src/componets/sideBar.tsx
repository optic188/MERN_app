import React, { useEffect, useState } from 'react'
import './sideBar.scss';
import {coveragesConfig} from './component-utils';
import {UseClearForm} from "./custom-hooks";

interface DynamicObject {
    [key: string]: any;
}
interface ISideBar {
    onChange:(data:Record<any, any>) => void
    resetForm?: boolean
}
const SideBar: React.FC<ISideBar> = ({ onChange, resetForm })=> {
    const [optionState, setOptionState] = useState(coveragesConfig)
    const [key, setKey] = useState(0)

    const onInputChange =  (e: React.ChangeEvent<HTMLInputElement>, index: number)=> {
        setOptionState((prevItems: any ) => prevItems.map((item:any, i: number) =>{
                return (i === index ? { ...item, value: !item.value } : item)
            })
        );
        setKey(key+1)
    }

    useEffect(()=> {
        if(key === 0) { return}
        let resObj: DynamicObject = {}
        optionState.forEach((elem: Record<string, any>)=> {
            if(elem.value === true) {
                resObj[elem.name] = 1;
            }
        })
        onChange({coverages:resObj})
    }, [key])

    /**
     * Custom hooks
     */

    UseClearForm(resetForm, setOptionState)

    return (
        <>
            <h2>Coverages</h2>
            <div className='coverage-sidebar'>
                {optionState.map((elem: any, index )=>{
                    return (
                        <div key={elem.index} className={'form-group'}>
                            <input name={elem.name} onChange={(e)=> onInputChange(e, index)} checked={elem.value}  type="checkbox"  />
                            <label>
                                {elem.title}:
                            </label>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default SideBar