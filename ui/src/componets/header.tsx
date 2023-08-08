import React from 'react'

const Header = ({onChange, commercialDiscount }: any)=> {
    return (
        <div className='header-form'>
            <div className={'form-group'}>
                <label>
                    Name:
                </label>
                <input name='userName' onChange={onChange} value={commercialDiscount}  type="checkbox"  />
            </div>
        </div>
    )
}
export default Header