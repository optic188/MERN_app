import React, {useState, useEffect} from 'react'
import './headrForm.scss';
import {discountConfig} from './component-utils';

interface DynamicObject {
    [key: string]: any;
}
interface IHeader {
    onChange: (data: Record<any, any>)=>void;
    totalPrice: number;
    userVehiclePower: number;
    coverageAmount?: number
}

const Header:React.FC<IHeader> = ({onChange, totalPrice, userVehiclePower, coverageAmount })=> {

    const [optionState, setOptionState] = useState(discountConfig)
    // to track the state updates
    const [key, setKey] = useState(0)

    let discountCount = 0
    const onInputChange =  (e: React.ChangeEvent<HTMLInputElement>, index: number)=> {
        setOptionState((prevItems: any ) =>
            prevItems.map((item:any, i: number) =>{
                if(item.value === true) {
                    discountCount +=1
                } else {
                    discountCount -=1
                }
                return (i === index ? { ...item, value: !item.value } : item)
            })
        );
        setKey(key+1)
    }

    useEffect(()=>{
        if(key === 0) { return}
        let resObj: DynamicObject = {}
            optionState.forEach((elem: Record<string, any>)=> {
                if(elem.value === true) {
                    resObj[elem.name] = 1;
                }
            })
            onChange({discounts:resObj})
    }, [key])

    useEffect(()=> {
        if(userVehiclePower > 80 && optionState.length <= 4) {
            setOptionState(prevArray => {
                const newArray = [...prevArray];
                newArray.splice(1, 0,  {
                    name:'summerDiscount',
                    title: 'Vip discount',
                    value: false
                },);
                return newArray;
            });
        } else {
            setOptionState(prevArray => {
                const newArray = [...prevArray];
                return  newArray.filter((elem)=> elem.name !== 'summerDiscount');
            });
        }
    }, [userVehiclePower])

    useEffect(()=> {
        if(coverageAmount === 2) {
            setOptionState(prevArray => {
                const newArray = [...prevArray];
                if (!newArray.some(obj => obj.name === 'agentDiscount')) {
                    newArray.splice(1, 0, {
                    name:'agentDiscount',
                    title: 'Adviser discount ',
                    value: false
                });
                }
                return newArray;
            });
        }
    }, [coverageAmount])
    return (
        <div className='header-form'>
            {optionState.map((elem: any, index: number )=>{
                return (
                <div key={elem.index} className={'form-group'}>
                    <input name={elem.name} onChange={(e)=>onInputChange(e,index)} checked={elem.value} disabled={elem.name==='strongCarSurcharge'}  type="checkbox"  />
                    <label>
                        {elem.title}
                    </label>
                </div>
                )
            })}
            <div className={'form-group'}>
               <p>Total price:</p>
                <p>{totalPrice}</p>
            </div>
        </div>
    )
}
export default Header