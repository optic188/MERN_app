import React, {useEffect, useState} from 'react'
import './userForm.scss';

export interface IUserForm {
    userName: string,
    userBirthDate: Date,
    userCity?: string,
    userVehiclePower: number,
    userVoucher?: number,
    userPriceMatch?: number
}

const UserForm = ({saveUserData, userPriceMatch}:any)=> {
    const [formItem, setForm] = useState<IUserForm>({
        userName:'',
        userBirthDate: new Date(),
        userVehiclePower:0,
        userPriceMatch:userPriceMatch
    })
    useEffect(()=>{
        setForm((prevState) => ({
            ...prevState,
            userPriceMatch:userPriceMatch
        }));
    }, [userPriceMatch])

    // console.log('userPriceMatch', userPriceMatch)
    const [error, setError] = useState(false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        const { name, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: name==='userBirthDate'? new Date(value).toISOString(): value
        }));
    }

    const onClick = async ()=> {
        if(!formItem.userBirthDate || !formItem.userVehiclePower || !formItem.userName) {
            setError(true)
            return
        } else {
            setError(false)
        }
        try {
            saveUserData(formItem)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={'user-form'}>
            <h2>User Data</h2>
            <div className={'form-group'}>
                <label>
                    Name:
                </label>
                <input name='userName' onChange={onChange} value={formItem.userName}  type="text" required={true} placeholder={'Enter user name'}/>
            </div>
            <div className={'form-group'}>
                <label>
                    Birth date:
                </label>
                <input name='userBirthDate' onChange={onChange} type="date" placeholder={'dd/mm/yyy'}/>
            </div>
            <div className={'form-group'}>
                <label>
                    userCity:
                </label>
                <input name='userCity' onChange={onChange} type="text" required={true} placeholder={'enter userCity'}/>
            </div>
            <div className={'form-group'}>
                <label>
                    Vehicle power:
                </label>
                <input name='userVehiclePower' onChange={onChange} type="number" placeholder={'enter vehicle power'}/>
            </div>
            <div className={'form-group'}>
                <label>
                    userVoucher:
                </label>
                <input name='userVoucher' type="number"  onChange={onChange} placeholder={'enter userVoucher discount'}/>
                <span> EUR</span>
            </div>
            <div className={'form-group'}>
                <label>
                    Price match:
                </label>
                <input name='userPriceMatch'  value={formItem.userPriceMatch} type="number" onChange={onChange} placeholder={'enter userVoucher discount'}/>
                <span> EUR</span>
            </div>
            {error && <p className='error'>Birth date, Vehicle power, Name fields are required </p>}
            <button onClick={onClick}>Click me</button>
        </div>
    )
}
export default UserForm