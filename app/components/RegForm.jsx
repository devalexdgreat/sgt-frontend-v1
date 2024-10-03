import SignupForm from "./SignupForm";
import { GoArrowLeft } from "react-icons/go";

export default function RegForm({ toggleModal, handleNext, userData, setUserData }) {
    return (
        <div className="absolute top-0 md:hidden w-full bg-transparent flex flex-col">
            <div className="w-full pb-4 pt-2">
                <button onClick={toggleModal}><GoArrowLeft className="h-6 w-6" /></button>
            </div>
            <SignupForm handleNext={handleNext} userData={userData} setUserData={setUserData} />
        </div>
    );
}