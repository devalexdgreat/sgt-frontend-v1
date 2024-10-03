import SignupForm from "./SignupForm";

export default function RegFormPc({ handleNext, userData, setUserData }) {
    return (
        <div className="w-full bg-transparent flex flex-col">
            <SignupForm handleNext={handleNext} userData={userData} setUserData={setUserData} />
        </div>
    );
}