'use client';
import Image from "next/image";
import LogoImg from '@/public/hero.png';
import Link from 'next/link';
import { useState } from "react";
import RegForm from "./RegForm";
import PayForm from "./PayForm";
import NoSeasonCard from "./NoSeasonCard";
import NoSeasonPcCard from "./NoSeasonPcCard";
import RegFormPc from "./RegFormPc";
import PayFormPc from "./payFormPc";

export default function Hero({ session }) {

    const [openModal, setOpenmodal] = useState(false);
    const [page, setPage] = useState(0);
    const [pagePc, setPagePc] = useState(0);
    const [isSeasonAvail, setIsSeasonAvail] = useState(true);
    const [openNoModal, setOpenNoModal] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        phoneNo: '',
        instagram: '',
        tiktok: '',
        email: '',
        perf: '',
        img: null,
    });

    const toggleNoModal = () => {
        setOpenNoModal(prevOpenNoModal => !prevOpenNoModal);
    };

    const toggleModal = () => {
        setOpenmodal(prevOpenModal => !prevOpenModal);
    };

    const PageDisplay = () => {
        if(page === 0) {
            return <RegForm toggleModal={toggleModal} handleNext={handleNext} setUserData={setUserData} userData={userData} />
        } else if(page === 1) {
            return <PayForm handlePrev={handlePrev} session={session} userData={userData} />
        }
    }

    const PageDisplayPc = () => {
        if(pagePc === 0) {
            return <RegFormPc handleNext={handleNextPc} setUserData={setUserData} userData={userData} />
        } else if(pagePc === 1) {
            return <PayFormPc handlePrev={handlePrevPc} session={session} userData={userData} />
        }
    }

    const handleNext = () => {
        if(!userData.instagram || !userData.tiktok) {
            userData.instagram = 'nil';
            userData.tiktok = 'nil';
        }

        if( !userData.name || !userData.phoneNo || !userData.email || !userData.perf || !userData.img ) {
            alert('All fields are neccessary!');
            return;
        }

        setPage((currPage) => currPage + 1);
        console.log(userData);
    }

    const handleNextPc = () => {
        if(!userData.instagram || !userData.tiktok) {
            userData.instagram = 'nil';
            userData.tiktok = 'nil';
        }

        if( !userData.name || !userData.phoneNo || !userData.email || !userData.perf || !userData.img ) {
            alert('All fields are neccessary!');
            return;
        }

        setPagePc((currPage) => currPage + 1);
        console.log(userData);
    }

    const handlePrev = () => {
        setPage((currPage) => currPage - 1);
    }

    const handlePrevPc = () => {
        setPagePc((currPage) => currPage - 1);
    }

    const handleRegister = () => {
        if(session === null || session.currentSeason.acceptance === false) {
            setOpenNoModal(true);
        } else {
            toggleModal();
        }
    }

    return (
        <div id="signup" className="w-full hero-bg text-white h-[800px] md:h-screen flex justify-center items-center pt-0 md:pt-16 overflow-hidden">
            <div className="relative w-11/12 mx-auto flex flex-col md:flex-row md:justify-between h-5/6 justify-center items-center">

                <div className='flex flex-col items-center text-center md:text-left md:items-start w-full md:w-6/12'>
                    <Image src={LogoImg} className='w-10/12' alt='' height={1000} width={1000} />
                    <span className="font-bold">
                        { session === null ? (
                            <div className="hidden">error</div>
                        ):(
                            <span className="text-lg">{session.currentSeason.title}</span>
                        )}
                    </span>
                    {/* <p className='py-8 text-md'>Show case your talent and stand a chance to win big.
                    <br className='hidden md:block'/> Will you be the next street champion?</p> */}
                    <div>
                        <button onClick={handleRegister} className='mt-8 bg-[#52CF50] text-black py-2 px-6 rounded-md md:hidden'>Register Now</button>
                        <Link href={'#signup'} className="mt-8 hidden md:block py-2 px-6 border border-[#52CF50]">
                            Register Now
                        </Link>
                    </div>
                </div>
                <div className='hidden md:block w-6/12'>
                {
                    session === null 
                        ? (
                            <NoSeasonPcCard />
                        )
                        : session.currentSeason.acceptance === false
                        ? (
                            <NoSeasonPcCard />
                        )
                        : (
                            <div className="w-full">
                                {PageDisplayPc()}
                            </div>
                        )
                }
                </div>
                <NoSeasonCard openNoModal={openNoModal} toggleNoModal={toggleNoModal} />
                {openModal ? (
                    <div className="md:hidden w-full">
                        {PageDisplay()}
                    </div>
                ):(
                    <div className="hidden"></div>
                )}
            </div>
        </div>
    );
}