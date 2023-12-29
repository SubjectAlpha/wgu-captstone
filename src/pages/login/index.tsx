import ConfirmationButton from "@/opencrm/components/confirmButton";
import Input from "@/opencrm/components/input";
import { ChangeEvent, useState } from "react";
import { post } from "@/opencrm/utility/fetch";
import { useMutation } from "@tanstack/react-query";

export default function Index(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const loginMutation = useMutation({
        mutationFn: async () => {

            if(email != "" && password != "") {
                setErrorMessage("");
                await post("/api/login", {
                    email: email,
                    password: password
                });
            } else {
                const emailError = "The email address field cannot be blank, and have a valid email address.";
                const passwordError = "The password field cannot be blank.";

                setErrorMessage(email == "" ? emailError : passwordError);
            }
        },
        onSuccess: () => {
            // Redirect
            console.log("hooray");
        }
    })

    function onEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function loginClick() {
        loginMutation.mutate();
    }

    return(
        <div className="container mx-auto w-lvh h-5/6 flex flex-col bg-slate-700 mt-28 mb-10">
            <div className="flex flex-col items-center rounded box-shadow p-64">
                <p className="text-xl">Open-CRM</p>
                <Input className="shrink w-64 h-10 mb-2" placeholder="Email" type="text" value={email} onChange={onEmailChange}/>
                <Input className="shrink w-64 h-10 mb-2" placeholder="Password" type="password" value={password} onChange={onPasswordChange}/>
                {errorMessage.length > 0 ? <p className="text-red-500 p-2 pt-0">{errorMessage}</p> : <span/>}
                <ConfirmationButton buttonText="Login" onClick={loginClick}/>
            </div>
        </div>
    )
}
