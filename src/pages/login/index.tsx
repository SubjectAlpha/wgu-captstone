import ConfirmationButton from "@/opencrm/components/confirmButton";
import Input from "@/opencrm/components/input";
import { ChangeEvent, useState } from "react";

export default function Index(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    return(
        <div className="container mx-auto w-100 h-5/6 flex flex-col bg-slate-700 mt-28 mb-10">
            <div className="flex flex-col items-center rounded box-shadow p-64">
                <p className="text-xl">Open-CRM</p>
                <Input className="shrink w-64 h-10 mb-2" placeholder="Email" value={email} onChange={onEmailChange}/>
                <Input className="shrink w-64 h-10 mb-2" placeholder="Password" type="password" value={password} onChange={onPasswordChange}/>
                <ConfirmationButton buttonText="Login" />
            </div>
        </div>
    )
}