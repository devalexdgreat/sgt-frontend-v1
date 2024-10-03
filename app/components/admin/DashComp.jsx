'use client'
import AdminNav from "@/app/components/AdminNav";
import Image from "next/image";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import conImg from '@/public/conte.png';
import { useState } from "react";
export default function DashComp({ data, lData }) {

    const [isSelected, setIsSelected] = useState(false);

    const toggleLead = () => {
        setIsSelected(true);
    }

    const toggleComp = () => {
        setIsSelected(false);
    }

    return (
        <div className="md:mt-10 lg:mt-0 relative w-full mx-auto text-white">
            <AdminNav />
            <div className="text-center hidden md:block">
                <h1 className="font-bold text-lg">Dashboard</h1>
            </div>
            <div className="w-full md:w-6/12 mx-auto md:bg-black/60 backdrop-blur-sm rounded-md overflow-y-scroll scrollbar-hide h-[90vh] md:h-96 mt-12 pb-6 border border-gray-800">
                <div className="text-center md:hidden mt-2">
                    <h1 className="font-medium text-lg">Dashboard</h1>
                </div>
                <div className="bg-black rounded-t-md text-sm border-gray-800 border-b-2 w-full flex justify-between sticky top-0">
                    <button onClick={toggleComp} className="w-full flex justify-end items-end p-3 pe-5">
                        <div>
                            {isSelected === true ? (
                                <span>Competitors ({data.length})</span>
                            ):(
                                <span className="text-green-500 border-green-500 border-b-2 pb-1 duration-150">Competitors ({data.length})</span>
                            )}
                        </div>
                    </button>
                    <button onClick={toggleLead} className="w-full flex justify-start items-start p-3 ps-5">
                        <div>
                            {isSelected === true ? (
                                <span className="text-green-500 border-green-500 border-b-2 pb-1 duration-150">Leaderboards</span>
                            ):(
                                <span>Leaderboards</span>
                            )}
                        </div>
                    </button>
                </div>
                {isSelected ? (
                    <>
                        {data.length < 1 ? (
                            <div className="h-full flex justify-center items-center">
                                <span className="w-full text-center">No Contestant at the moment😥</span>
                            </div>
                        ):(
                            <div className="">
                                {lData.map((lDatum) => (
                                    <div key={lDatum._id} className="px-3 py-2 flex justify-between items-center border-gray-800 border-b-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-16 w-16 rounded-md">
                                                <Image width={1000} height={1000} src={lDatum.imageUrl} className="bg-cover h-full w-full rounded-md" alt="contestant" />
                                            </div>
                                            <div className="">
                                                <h1>{lDatum.name}</h1>
                                                <p className="text-sm text-gray-400">Performance: <span>{lDatum.performanceType}</span></p>
                                                {lDatum.status === 'evicted' ? (
                                                    <div className="bg-red-500 text-white w-16 text-[12px] text-center rounded-md">
                                                        {lDatum.status.charAt(0).toUpperCase() + lDatum.status.slice(1)}
                                                    </div>
                                                ):(
                                                    <div className="bg-green-500 text-white w-16 text-[12px] text-center rounded-md">
                                                        {lDatum.status.charAt(0).toUpperCase() + lDatum.status.slice(1)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 text-gray-400 text-sm">
                                            <span className="text-green-500"> {lDatum.group ? lDatum.group : "No Group"}</span>
                                            <span className="border-bottom border-gray-200">{lDatum.votes} Votes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ):(
                    <>
                        {data.length < 1 ? (
                            <div className="h-full flex justify-center items-center">
                                <span className="w-full text-center">No Contestant at the moment😥</span>
                            </div>
                        ):(
                            <div className="">
                                {data.map((datum) => (
                                    <div key={datum._id} className="px-3 py-2 flex justify-between items-center border-gray-800 border-b-2">
                                        <div className="flex items-center gap-2">
                                            <div className="h-16 w-16 rounded-md">
                                                <Image height={1000} width={1000} src={datum.imageUrl} className="bg-cover h-full w-full rounded-md" alt="contestant" />
                                            </div>
                                            <div className="flex flex-col gap-0.5 justify-center">
                                                <h1 className="">{datum.name}</h1>
                                                <span className="text-sm text-gray-400">Performance: <span>{datum.performanceType}</span></span>
                                                {datum.status === 'evicted' ? (
                                                    <div className="bg-red-500 text-white w-16 text-[12px] text-center rounded-md">
                                                        {datum.status.charAt(0).toUpperCase() + datum.status.slice(1)}
                                                    </div>
                                                ):(
                                                    <div className="bg-green-500 text-white w-16 text-[12px] text-center rounded-md">
                                                        {datum.status.charAt(0).toUpperCase() + datum.status.slice(1)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            <span className="border-bottom border-gray-200">{datum.votes} Votes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}