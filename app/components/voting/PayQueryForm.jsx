'use client'
import { FaRegUser } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

export default function PayQueryForm({ userData, setUserData, handleNext, handlePrev }) {
    return (
        <div className="bg-white text-black rounded-md w-11/12 md:w-4/12 p-3 relative">
            <button onClick={handlePrev} className="absolute top-2 right-2 rounded-sm bg-red-500 text-white"><IoClose /></button>
            <h1 className="font-bold mb-4 text-xl">Vote for Candidate</h1>
            <form className="w-full">
                <div className="flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-semibold">Name</label>
                        <div className="border border-black flex justify-between items-center px-1">
                            <input required value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} type="text" placeholder="input name" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                            <FaRegUser />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="font-semibold">Email</label>
                        <div className="border border-black flex justify-between items-center px-1">
                            <input required value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="input email address" className="py-2 md:py-0.5 w-full outline-none ps-1" />
                            <MdOutlineMail />
                        </div>
                    </div>
                    <div>
                        <button onClick={handleNext} className="bg-green-500 text-white py-2 px-8 rounded-md">Next</button>
                    </div>
                </div>
            </form>
        </div>
    );
}