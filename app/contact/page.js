'use client'
import Image from "next/image";
import Link from "next/link";
import successIcon from '@/public/sent.png'
import failIcon from '@/public/failed.png' 
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import Navbar from "../components/Navbar";

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isDone, setIsDone] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!name || !email || !subject || !message) {
            alert('All fields are necessary!');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contestants/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, message, subject}),
            });

            if(res.ok) {
                const data = await res.json();
                const successMsg = data.message;
                setMsg(successMsg);
                setIsDone(true);
                setIsSuccess(true);
            }
        } catch (error) {
            console.error('Error while sending message:', error);
            const data = await res.json();
            const errorMsg = data.message;
            setMsg(errorMsg);
            setIsDone(true);
            setIsSuccess(false);
        }
    }

    return (
        <div className="w-full">
            <Navbar />
            <div className="w-full hero-bg text-black h-[800px] md:h-auto flex justify-center items-center pt-5 md:pt-16 overflow-hidden">
                <div className="relative w-11/12 md:w-full mx-auto flex flex-col h-5/6 justify-center items-center rounded-md  bg-white/10 backdrop-blur-sm md:bg-transparent md:backdrop-blur-0 text-white">
                    {isDone ? (
                        <div className="w-full flex justify-center h-screen items-center">
                            {isSuccess ? (
                                <div className="bg-white backdrop-blur-sm rounded-md h-3/6 w-11/12 md:w-5/12 flex justify-center items-center flex-col">
                                    <h1 className="mb-2 text-black font-bold text-xl">Message sent successfully</h1>
                                    <Image src={successIcon} className="w-44" height={100} width={100} alt="Payment Icon" />
                                    <p className="text-center text-sm w-10/12 text-black">{msg}</p>
                                    <Link href={'/'} className="mt-3 mb-2 bg-[#52CF50] text-white py-2 px-6 rounded-md flex justify-center items-center text-center"> 
                                        <span>Go back</span>
                                    </Link>
                                </div>
                            ):(
                                <div className="bg-white backdrop-blur-sm rounded-md h-3/6 w-11/12 md:w-5/12 flex justify-center items-center flex-col">
                                    <h1 className="mb-2 text-black font-bold text-xl">Message sent unsuccessfully</h1>
                                    <Image src={failIcon} className="w-44" height={100} width={100} alt="Payment Icon" />
                                    <p className="text-red-500 text-center text-sm w-10/12">{msg}</p>
                                    <Link href={'/contact'} className="mt-3 mb-2 bg-[#52CF50] text-white py-2 px-6 rounded-md flex justify-center items-center text-center">
                                        <span>Retry</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    ):(
                        
                        <form onSubmit={handleSubmit} className="text-sm w-11/12 md:w-7/12 lg:w-5/12 flex flex-col gap-6 md:pb-24 md:pt-6">
                            <div className="flex items-start w-11/12">
                                <Link href={'/'} className="w-full flex items-start justify-start md:hidden">
                                    <GoArrowLeft className="h-6 w-6" />
                                </Link>
                            </div>
                            <h1 className="py-6 pb-8 text-xl md:text-2xl text-center">Like to share anything with us?</h1>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex flex-col gap-3 w-full">
                                    <label>
                                        Your name (Required)
                                    </label>
                                    <div className="border border-gray-500 flex justify-between items-center px-1 gap-3 rounded-sm bg-white">
                                        <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="John Doe" className="py-2 md:py-0.5 text-gray-700 w-full outline-none ps-1" />
                                        <FaRegUser className="h-4 w-4 text-gray-500 pe-1" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-full">
                                    <label>
                                        Your email (Required)
                                    </label>
                                    <div className="border border-gray-500 flex justify-between items-center px-1 gap-3 rounded-sm bg-white">
                                        <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Johndoe@email.com" className="py-2 md:py-0.5 text-gray-700 w-full outline-none ps-1" />
                                        <MdOutlineMail className="h-5 w-5 text-gray-500 pe-1" />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-3 w-full">
                                <label>
                                    Subject
                                </label>
                                <div className="border border-gray-500 flex justify-between items-center px-1 gap-3 rounded-sm bg-white">
                                    <input onChange={(e)=> setSubject(e.target.value)} type="text" placeholder="I want to register" className="py-2 md:py-0.5 text-gray-700 w-full outline-none px-1" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full">
                                <label>
                                    Your message
                                </label>
                                <div className="border border-gray-500 flex justify-between items-center px-1 gap-3 rounded-sm bg-white">
                                    <textarea placeholder="How much is the registration fee..." onChange={(e)=> setMessage(e.target.value)} className="py-2 md:py-0.5 text-gray-700 w-full outline-none px-1 resize-none rounded-sm" rows='4'>
                                    </textarea>
                                </div>
                            </div>
                            <input type="submit" value='Send' className="bg-[#52CF50] text-white w-full py-2 px-6 rounded-md" />
                        </form>
                    )}
                    
                </div>
            </div>
        </div>
    );
}