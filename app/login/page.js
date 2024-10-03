'use client'
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { BiSolidError } from "react-icons/bi";
import { setToken } from "@/actions";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(!email || !password) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/admins/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password}),
            });
        
            if(response.ok) {
                setError('');
                const data = await response.json();
                const accessToken = data.accessToken;

                // Store the token in local storage or session storage
                localStorage.setItem('accessToken', accessToken);
                await setToken(accessToken);

                router.push("/admin/dashboard");
            } else {
                setIsLoading(false);
                const errorData = await response.json();
                setError(errorData.message);
            }

        } catch (error) {
            setIsLoading(false);
            console.log(error);
            setError(error.message);
        }
    }

    return (
        <div className="w-full h-screen bg-black hero-bg flex justify-center items-center">
            {/* <Navbar /> */}
            <div className="w-full fixed top-0 z-40 bg-black text-white">
                <div className="w-11/12 mx-auto flex justify-between items-center py-6">
                    <div className="flex items-start">
                        <Link href={'/'} className="">
                            <GoArrowLeft className="w-6 h-6 hover:text-[#52CF50] duration-500" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="w-11/12 mx-auto flex justify-center items-center">
                <form onSubmit={handleSubmit} className="bg-white text-black rounded-md w-full md:w-4/12 py-6 px-3 flex flex-col gap-6">
                    <div className="font-medium w-full text-center">
                        <h1 className="text-lg">Admin Login</h1>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <span className="text-red-500 font-medium">{error}</span>
                        <span className="text-black font-medium">{success}</span>
                        <label>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" className="text-sm py-1.5 ps-2 border border-gray-500 rounded-sm" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Abc123" className="text-sm py-1.5 ps-2 border border-gray-500 rounded-sm" />
                    </div>
                    <div className="w-full flex justify-center">
                        <button disabled={isLoading} type="submit" className="bg-green-500 text-white py-2 px-8 rounded-md">{isLoading ? 'Processing...':'Login'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}