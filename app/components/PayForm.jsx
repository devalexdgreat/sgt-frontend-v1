import PaymentForm from "./PaymentForm";
import { GoArrowLeft } from "react-icons/go";

export default function PayForm({ handlePrev, session, userData }) {
    return (
        <div className="fixed left-0 top-0 md:hidden w-full bg-black/90 backdrop-blur-sm h-screen flex flex-col justify-center items-center">
            <div className="w-11/12">
                <div className="pb-4 pt-2">
                    <button onClick={handlePrev}><GoArrowLeft className="h-6 w-6" /></button>
                </div>
                <PaymentForm session={session} userData={userData} />
            </div>
        </div>
    );
}