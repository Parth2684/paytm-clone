import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flec-col justify-center">
            <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
                <Heading label={"Signup"} />
                <SubHeading label={"Enter your information to create an account"} />
                <InputBox placeholder="John" label={"First Name"} />
                <InputBox placeholder="Doe" label={"Last Name"} />
                <InputBox placeholder="bhosle6006@gmail.com" label={"Email"} />
                <InputBox placeholder="123456" label={"Password"} />
                <div className='pt-4'>
                    <Button label={"Signup"} />
                </div>
                <BottomWarning label={"Already have an account? "} buttonText={"Signin"} to={"/signin"} />
            </div>
        </div>
    </div>
}