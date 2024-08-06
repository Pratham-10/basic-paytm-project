import { BottomRedirect } from "../components/BottomRedirect"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Login = () => {
    return (
        <div className="bg-slate-400 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-4 h-max px-5">
                    <Heading label={"Login"} />
                    <SubHeading label={"Enter your email and password to login"} />
                    <InputBox label={"Email"} placeholder={"abc@gmail.com"} />
                    <InputBox label={"Password"} placeholder={"password"} />
                    <Button label={"Login"} />
                    <BottomRedirect label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}