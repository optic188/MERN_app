import React from 'react'
import './sideBar.scss';

const SideBar = ({coveragesConfig,onChange }: any)=> {
    return (
        <>
            <h2>Coverages</h2>
            <div className='coverage-sidebar'>
                {coveragesConfig.map((elem: any )=>{
                    return (
                        <div className={'form-group'}>
                            <input name={elem.name} onChange={onChange} value={elem.value}  type="checkbox"  />
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