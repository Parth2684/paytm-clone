import { useNavigate } from "react-router-dom"
import { Button } from "./Button";


export const Users = () => {
    
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    Parth
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    Parth Bhosle
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"} />
        </div>
    </div>
}