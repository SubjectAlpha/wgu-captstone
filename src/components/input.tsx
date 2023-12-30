import React, { FC } from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{

}

const Input: FC<InputProps> = ({...props}) => {
    return <input className="rounded-full bg-slate-100 w-100" {...props}/>
}

export default Input;
