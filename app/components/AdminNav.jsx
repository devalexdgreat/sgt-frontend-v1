'use client'
import Image from "next/image";
import LogoImg from '@/public/logobg.png';
import Link from "next/link";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { delToken } from "@/actions";
import { useRouter } from "next/navigation";

export default function AdminNav() {
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    };

    const logOut = async () => {
        await delToken();
        localStorage.removeItem('accessToken');
        router.refresh();
    }

    return (
        <div className="w-full flex justify-center fixed text-white top-0 z-30 bg-black">
            <div className="w-11/12 flex justify-between items-center py-6">
                <Link href={'/admin/dashboard'} className="flex items-center gap-1">
                    <GoArrowLeft className="w-6 h-6 hover:text-[#52CF50] duration-500" />
                    <span>Home</span>
                </Link>
                <button onClick={toggleMenu} className="lg:hidden"><HiMenuAlt1 className="h-6 w-6" /></button>
                <div className="md:flex gap-20 hidden">
                    <Link href={'/admin/contestants'} className="">Manage Contestants</Link>
                    <Link href={'/admin/seasons'} className="">Seasons</Link>
                    <Link href={'/admin/streetfood'} className="">Street Food</Link>
                </div>
                <div className="md:block hidden">
                    <button onClick={logOut} className="border border-[#52CF50] text-white py-2 px-6">Logout</button>
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
                            <Link href={'/admin/contestants'} onClick={toggleMenu} className="">Manage Contestants</Link>
                            <Link href={'/admin/seasons'} onClick={toggleMenu} className="">Seasons</Link>
                            <Link href={'/admin/streetfood'} onClick={toggleMenu} className="">Street Food</Link>
                        </div>
                        <div className="text-center w-full flex flex-col justify-center gap-6 mb-12">
                            {/* <p>Come show your talent and win grand prizes</p> */}
                            <div className="w-full flex justify-center">
                                <button onClick={logOut} className="border border-[#52CF50] text-white py-2 px-6 w-full text-center">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}