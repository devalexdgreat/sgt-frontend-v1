'use client';
import Image from "next/image";
import LogoImg from '@/public/logobg.png';
import Link from "next/link";
import { HiMenuAlt1 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { BsFilterLeft } from "react-icons/bs";
import testImg from '@/public/conte.png';
export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    // mobile
    const [isFilterMob, setIsFilterMob] = useState(false);
    const [optMob, setOptMob] = useState('name');
    const [query, setQuery] = useState('');
    const [queryResultMob, setQueryResultMob] = useState(null);
    const [isOpenMob, setIsOpenMob] = useState(false);
    const [notFoundMob, setNotFoundMob] = useState(false);
    const [isLoadingMob, setIsLoadingMob] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [errorMob, setErrorMob] = useState(false);
    const [errorMsgMob, setErrorMsgMob] = useState('');

    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    };
    // mobile

    const toggleFilterMob = () => {
        setIsFilterMob(prevOpt => !prevOpt);
    }

    const toggleSearchMob = () => {
        setIsOpenMob(prevOpt => !prevOpt);
    }

    const toggleNotFoundMob = () => {
        setNotFoundMob(prevOpt => !prevOpt);
    }

    const toggleErrorMob = () => {
        setErrorMob(prevOpt => !prevOpt);
    }

    const toggleIsLoadMob = () => {
        setIsLoadingMob(prevOpt => !prevOpt);
    }

    const handleSearch = async () => {
        if(!query) {
            alert('Search input is empty!')
            return;
        }
        setIsLoadingMob(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/contestants/search/current?${optMob}=${query}`, {
                cache: "no-store",
            });

            if(res.ok) {
                const data = await res.json();
                const result = data.contestants;
                console.log(result);
                setIsLoadingMob(false);
                setQueryResultMob(result);
                setIsResult(true);
                setNotFoundMob(false);
                setErrorMob(false);
            } else {
                setNotFoundMob(true);
                setIsResult(false);
                setErrorMob(false);
                setIsLoadingMob(false);
            }

        } catch (error) {
            console.log('Error Occured: ', error);
            const errorMsg = error.message;
            setErrorMsgMob(`${errorMsg}, due to internet connection interruption.`);
            setErrorMob(true);
            setIsLoadingMob(false);
        }
    }

    return (
        <div className="w-full bg-black/30 fixed text-white top-0 z-30">
            <div className="w-11/12 mx-auto flex justify-between items-center py-6 md:py-1">
                <Link href={'/'} className="hidden md:block">
                    <Image src={LogoImg} height={100} width={100} className="" alt="" />
                </Link>
                <button onClick={toggleMenu} className="lg:hidden"><HiMenuAlt1 className="h-6 w-6" /></button>
                <button onClick={toggleSearchMob} className="md:hidden"><FiSearch className="h-6 w-6" /></button>
                <div className="hidden w-6/12 md:hidden lg:flex justify-between">
                    <div className="flex gap-20">
                        <Link href={'/#contestants'} className="">Contestants</Link>
                        <Link href={'/#gallery'} className="">Gallery</Link>
                        <Link href={'/contact'} className="">Contact</Link>
                    </div>
                    <div>
                        <Link href={'/#signup'} className="border border-[#52CF50] text-white py-2 px-6">Sign-up</Link>
                    </div>
                </div>
            </div>
            {menuOpen && (
                <div className="w-full h-screen text-white fixed top-0 bg-black z-30 lg:hidden flex flex-col gap-8 items-center py-4">
                    <button onClick={toggleMenu} className="absolute top-4 right-4">
                        <IoClose className="h-6 w-6" />
                    </button>
                    <div className="w-full flex justify-center items-center">
                        <Image src={LogoImg} onClick={toggleMenu} height={100} width={100} className="" alt="" />
                    </div>
                    <div className="h-5/6 flex flex-col justify-between w-9/12">
                        <div className="flex flex-col gap-8 w-full mx-auto text-lg">
                            <Link href={'/#contestants'} onClick={toggleMenu} className="">Contestants</Link>
                            <Link href={'/#gallery'} onClick={toggleMenu} className="">Gallery</Link>
                            <Link href={'/contact'} onClick={toggleMenu} className="">Contact</Link>
                        </div>
                        <div className="text-center w-full flex flex-col justify-center gap-6 mb-12">
                            {/* <p>Come show your talent and win grand prizes</p> */}
                            <div className="w-full flex justify-center">
                                <button href={'/#signup'} onClick={toggleMenu} className="border border-[#52CF50] text-white py-2 px-6 w-full text-center">Sign-up</button>
                            </div>
                            <div className="flex justify-center items-center gap-3">
                                <Link href={'https://www.tiktok.com/@xpatainment?_t=8nbfITf0F3W&_r=1'} className="" passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaTiktok />
                                    </a>
                                </Link>
                                <Link href={'https://www.instagram.com/xpatainment_?igsh=aW1qc2RtaGt3bnBo'} className="" passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaInstagram />
                                    </a>
                                </Link>
                                <Link href={'https://www.facebook.com/streetsgottalent_'} className="" passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaFacebookF />
                                    </a>
                                </Link>
                                <Link href={'https://www.facebook.com/xpataintment?mibextid=kFxxJD'} className="" passHref legacyBehavior>
                                    <a target="_blank">
                                        <FaYoutube />
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isOpenMob && (
                <div className="bg-black text-white h-screen p-3 absolute top-0 w-full md:hidden z-50">
                    <div className="w-full">
                        <div className="flex w-full gap-4 items-center mt-2">
                            <div className="flex items-center gap-4">
                                <button className="" onClick={toggleSearchMob}>
                                    <GoArrowLeft className="w-6 h-6" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <button onClick={toggleFilterMob} className="hover:bg-green-500 hover:duration-500 relative rounded-md">
                                        <BsFilterLeft className="w-6 h-6" />
                                    </button>
                                    {isFilterMob && (
                                        <div className="bg-white text-black z-20 p-2 border absolute top-14 rounded-md">
                                            <span className="font-semibold text-left w-full">Search by</span>
                                            <div className="mt-2 flex flex-col items-center justify-center">
                                                <select onChange={(e)=> setOptMob(e.target.value)} className="outline-none">
                                                    <option value='name'>Select Filter</option>
                                                    <option value='name'>Name</option>
                                                    <option value='type'>Performance Type</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                            </div>
                            <div className="w-full rounded-full flex justify-between items-center gap-3 bg-white/20 px-3 py-2">
                                <input onChange={(e)=> setQuery(e.target.value)} type="" className="w-full outline-none bg-transparent text-base" placeholder={`Search ${optMob}`} />
                                <button onClick={handleSearch} className="hover:bg-green-500 p-0.5 rounded-full hover:duration-500">
                                    <FiSearch className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full pt-1">
                            {isResult && (
                                <div className="w-full flex flex-col gap-0.5 mt-2">
                                    {queryResultMob.map((r) => (
                                        <div key={r._id} className="flex gap-3 items-center relative hover:bg-white/20 rounded-md py-2 px-1">
                                            <Link onClick={toggleSearchMob} href={`https://www.streetgottalent.com/contestant/${r._id}`} className="top-0 absolute w-full h-full"></Link>
                                            <div className="h-10 w-10">
                                                <Image src={r.imageUrl} className="w-full h-full object-cover rounded-full" height={1000} width={1000} alt="" />
                                            </div>
                                            <div className="flex flex-col text-sm">
                                                <h1 className="font-bold">{r.name}</h1>
                                                <p className="text-gray-300">{r.performanceType}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {notFoundMob && (
                                <div className="px-1 py-3 text-lg text-gray-400 w-full flex items-center justify-between">
                                    <h1>Not found 😭</h1>
                                </div>
                            )}
                            {isLoadingMob && (
                                <div className="px-1 py-3 text-lg text-gray-400 w-full flex items-center justify-between">
                                    <h1>Searching...🔍</h1>
                                </div>
                            )}
                            {errorMob && (
                                <div className="bg-red-500/10 rounded-sm px-2 py-1 mt-2 border-l-4 border-red-500 text-lg text-white w-full flex items-center justify-between gap-5">
                                    <div className="w-full h-auto">
                                        <h1 className="font-bold text-red-500">Error 😭: </h1>
                                        <p className="text-wrap text-gray-300">{errorMsgMob}</p>
                                    </div>
                                    <button onClick={toggleErrorMob} className="flex justify-center items-center border border-red-500 text-white rounded-full"><IoClose className="text-red-500" /></button>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <span className="w-full flex justify-between items-center">
                        <span className="font-semibold">Results for {queryMob}</span>
                        <button onClick={toggleSearchMob} className="flex justify-center items-center bg-red-500 text-white rounded-md"><IoClose /></button>
                    </span>
                    {queryResult && (
                        <div className="flex flex-col mt-4 gap-2">
                            {queryResult.map((r) => (
                                <div key={r._id} className="flex gap-1.5 text-sm relative hover:bg-[#EAFFEA] p-1 rounded-md hover:duration-700">
                                    <Link onClick={toggleSearch} href={'#'} className="top-0 absolute w-full h-full"></Link>
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
                    )} */}
                    
                </div>
            )}
        </div>
    );
}