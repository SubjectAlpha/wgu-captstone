import React, { FC } from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    buttonText: string;
}

const ConfirmationButton: FC<ButtonProps> = ({buttonText, ...props}) => {

    return(
        <button className="bg-green-800 w-64 rounded" {...props}>
            {buttonText}
        </button>
    )
}

export default ConfirmationButton;
