import { GoArrowLeft } from "react-icons/go";
import PaymentForm from "./PaymentForm";

export default function PayFormPc({ handlePrev, session, userData }) {
    return (
        <div className="w-full bg-transparent flex flex-col">
            <div className="pb-4 pt-2">
                <button onClick={handlePrev}><GoArrowLeft className="h-6 w-6" /></button>
            </div>
            <PaymentForm session={session} userData={userData} />
        </div>
    );
}