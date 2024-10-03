'use client'
import Link from "next/link";
import { useState } from "react";
import { AiOutlineStop } from "react-icons/ai";
import { GoArrowLeft } from "react-icons/go";


export default function NoSeasonCard({ openNoModal, toggleNoModal }) {

    return (
        <>
        {openNoModal && (
            <div className="md:hidden w-full absolute top-0 h-screen">
                <div className="flex flex-col justify-center items-center">
                    <div className="pb-4 pt-2 flex w-full">
                        <button onClick={toggleNoModal}><GoArrowLeft className="h-6 w-6" /></button>
                    </div>
                    <div className="w-full p-4 bg-white rounded-md text-black flex flex-col justify-center items-center text-center gap-6">
                        <AiOutlineStop className="h-24 w-24" />
                        <h1>Application form is not available at the moment</h1>    <span className="font-bold">Contact us 
                        xpat@streetgottalent.com</span>
                        <Link href={'/contact'} className="bg-[#52CF50] rounded-md px-6 py-2 text-white">Send Us a message</Link>
                    </div>
                </div>
            </div> 
        )}
            
        </>
        
    );
}