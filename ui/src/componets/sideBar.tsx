import React, { useEffect, useState } from 'react'
import './sideBar.scss';
import {coveragesConfig} from './component-utils';

interface DynamicObject {
    [key: string]: any;
}

const SideBar = ({ onChange }: any)=> {
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