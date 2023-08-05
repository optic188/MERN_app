import React from 'react'
import {createItem} from "../api";

const UserForm = ()=> {
    const onClick = async ()=> {
        try {
             await createItem({})
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <p>userForm</p>
            <button onClick={onClick}>Click me</button>
        </>
    )
}
export default UserForm