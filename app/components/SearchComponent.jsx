'use client'
import Image from "next/image";
import { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import sImg from '@/public/img17.jpg';
import Link from "next/link";
import { IoClose } from "react-icons/io5";

export default function SearchComponent() {

    const [isFilter, setIsFilter] = useState(false);
    const [opt, setOpt] = useState('name');
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const toggleFilter = () => {
        setIsFilter(prevOpt => !prevOpt);
    }

    const toggleSearch = () => {
        setIsOpen(prevOpt => !prevOpt);
    }

    const toggleNotFound = () => {
        setNotFound(prevOpt => !prevOpt);
    }

    const toggleError = () => {
        setError(prevOpt => !prevOpt);
    }

    const toggleIsLoad = () => {
        setIsLoading(prevOpt => !prevOpt);
    }

    const handleSearch = async () => {
        if(!query) {
            alert('Search input is empty!')
            return;
        }
        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contestants/search/current?${opt}=${query}`, {
                cache: "no-store",
            });

            if(res.ok) {
                const data = await res.json();
                const result = data.contestants;
                console.log(result);
                setIsLoading(false);
                setQueryResult(result);
                setIsOpen(true);
                setNotFound(false);
                setError(false);
            } else {
                setNotFound(true);
                setIsOpen(false);
                setError(false);
                setIsLoading(false);
            }

        } catch (error) {
            console.log('Error Occured: ', error);
            const errorMsg = error.message;
            setErrorMsg(`${errorMsg}, due to internet connection interruption.`)
            setError(true);
            setIsLoading(false);
        }
    }

    return (
        <div className="hidden md:block relative">
            <div className="flex gap-3">
                <button onClick={toggleFilter} className="bg-[#EAFFEA] w-8 flex justify-center items-center rounded-md">
                    <BsFilterLeft className="" />
                </button>
                <div className="border border-black rounded-md flex items-center gap-1">
                    <input onChange={(e)=> setQuery(e.target.value)} type="" className="outline-none p-1 ms-1" placeholder={`Search by ${opt}`} />
                    <button onClick={handleSearch} className="hover:bg-[#eee] p-1 me-1 rounded-md hover:duration-500">
                        <FiSearch className="" />
                    </button>
                </div>
            </div>
            {isFilter && (
                <div className="bg-white p-2 border absolute -top-20 rounded-md">
                    <span className="font-semibold mb-2">Search by</span>
                    <div className="flex flex-col">
                        <select onChange={(e)=> setOpt(e.target.value)} className="outline-none">
                            <option value='name'>Select Filter</option>
                            <option value='name'>Name</option>
                            <option value='type'>Performance Type</option>
                        </select>
                    </div>
                </div>
            )}
            {isOpen && (
                <div className="bg-white p-2 border absolute top-10 rounded-md w-full">
                    <span className="w-full flex justify-between items-center">
                        <span className="font-semibold">Results for {query}</span>
                        <button onClick={toggleSearch} className="flex justify-center items-center bg-red-500 text-white rounded-md"><IoClose /></button>
                    </span>
                    {queryResult && (
                        <div className="flex flex-col mt-4 gap-2">
                            {queryResult.map((r) => (
                                <div key={r._id} className="flex gap-1.5 text-sm relative hover:bg-[#EAFFEA] p-1 rounded-md hover:duration-700">
                                    <Link onClick={toggleSearch} href={`https://www.streetgottalent.com/contestant/${r._id}`} className="top-0 absolute w-full h-full"></Link>
                                    <div className="h-12 w-12">
                                        <Image src={r.imageUrl} className="rounded-md h-full w-full object-cover object-top" alt="" width={1000} height={1000} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h1 className="font-bold">{r.name}</h1>
                                        <p className="text-gray-700 text-sm">{r.performanceType}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                </div>
            )}
            {notFound && (
                <div className="bg-gray-100 p-2 border absolute top-10 rounded-md w-full flex items-center justify-between">
                    <h1>Not found 😭🔍</h1>
                    <button onClick={toggleNotFound} className="flex justify-center items-center bg-red-500 text-white rounded-md"><IoClose /></button>
                </div>
            )}
            {isLoading && (
                <div className="bg-gray-100 p-2 border absolute top-10 rounded-md w-full flex items-center justify-between">
                    <h1>Searching...🔍</h1>
                    <button onClick={toggleIsLoad} className="flex justify-center items-center bg-red-500 text-white rounded-md"><IoClose /></button>
                </div>
            )}
            {error && (
                <div className="bg-red-500 text-white p-2 border absolute top-10 rounded-md w-full flex items-center justify-between">
                    <h1>Error 😭: {errorMsg}</h1>
                    <button onClick={toggleError} className="flex justify-center items-center border border-white text-white rounded-full"><IoClose className="text-white" /></button>
                </div>
            )}
        </div>
    );
}