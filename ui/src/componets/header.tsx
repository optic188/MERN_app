import React from 'react'
import './headrForm.scss';

const Header = ({onChange, commercialDiscount, discountConfig, totalPrice }: any)=> {
    return (
        <div className='header-form'>
            {discountConfig.map((elem: any )=>{
                return (
                <div className={'form-group'}>
                    <input name={elem.name} onChange={onChange} value={elem.value}  type="checkbox"  />
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