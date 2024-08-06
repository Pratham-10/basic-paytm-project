import { useState } from "react"
import { BottomRedirect } from "../components/BottomRedirect"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"

export const Signup = () => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    return (
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-5">
                    <Heading label={"Sign Up"} />
                    <SubHeading label={"Enter your details to create an account"} />
                    <InputBox onChange={(e)=>setFirstName(e.target.value)} label={"First Name"} placeholder={"abc"} />
                    <InputBox onChange={(e)=>setLastName(e.target.value)} label={"Last Name"} placeholder={"xyz"} />
                    <InputBox onChange={(e)=>setEmail(e.target.value)} label={"Email"} placeholder={"abc@gmail.com"} />
                    <InputBox onChange={(e)=>setPassword(e.target.value)} label={"Password"} placeholder={"password"} />
                    <Button label={"Sign up"} />
                    <BottomRedirect label={"Already have an account?"} buttonText={"Login"} to={"/login"} />
                </div>
            </div>
        </div>
    )
}