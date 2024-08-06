import { Link } from "react-router-dom"

export const BottomRedirect = ({label,buttonText,to}) => {
    return (
        <div className="px-2 text-sm flex justify-center">
            <div>
                {label}
            </div>
            <Link className="pointer underline pl-1 cursor-pointer" to={to}>
                {buttonText}
            </Link>
        </div>
    )
}