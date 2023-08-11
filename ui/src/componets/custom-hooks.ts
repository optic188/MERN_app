import {useEffect, SetStateAction} from "react";
interface Iitem {
    name: string; title: string; value: boolean
}
type StateType = Function;
export const UseClearForm = (resetForm: boolean | undefined, setOptionState: SetStateAction<StateType> )=>{
    useEffect(()=> {
        if(resetForm) {
            setOptionState((prevItems: Record<any, any> ) =>
                prevItems.map((item:Iitem, i: number) =>{
                    return {...item, value:false}
                })
            );
        }
    }, [resetForm])
}